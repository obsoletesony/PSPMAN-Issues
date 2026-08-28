const test = require("node:test");
const assert = require("node:assert/strict");

const {
  classifyIssue,
  extractSection,
  hasUploadedLog,
  hasUploadedLogInComment,
} = require("../scripts/triage.js");

function issue({ title, body, labels = [] }) {
  return { title, body, labels: labels.map((name) => ({ name })) };
}

test("extractSection returns only the requested form answer", () => {
  const body = `### PSP model

PSP-2000

### What happened?

It froze.
`;
  assert.equal(extractSection(body, ["PSP model"]), "PSP-2000");
});

test("classifies an English PSP-2000 playback bug with an attached log", () => {
  const body = `### PSP model

PSP-2000

### Where did the problem happen?

Playback interruption, noise, or incorrect audio

### Diagnostic log status

I attached PSPMAN-HW-DIAG.log below

### Attach PSPMAN-HW-DIAG.log

[PSPMAN-HW-DIAG.log](https://github.com/user-attachments/files/123/PSPMAN-HW-DIAG.log)
`;
  const labels = classifyIssue(issue({ title: "[Bug] Playback stopped", body }));

  assert.ok(labels.includes("type: bug"));
  assert.ok(labels.includes("status: needs triage"));
  assert.ok(labels.includes("model: PSP-2000"));
  assert.ok(labels.includes("area: playback"));
  assert.ok(labels.includes("log: attached"));
  assert.ok(!labels.includes("log: missing"));
});

test("does not mistake the upload field heading for an attached log", () => {
  const body = `### PSP model

PSP-3000

### Where did the problem happen?

Album artwork or cover loading

### Diagnostic log status

I could not find it

### Attach PSPMAN-HW-DIAG.log

_No response_
`;
  assert.equal(hasUploadedLog(body), false);

  const labels = classifyIssue(issue({ title: "[Bug] Cover missing", body }));
  assert.ok(labels.includes("model: PSP-3000"));
  assert.ok(labels.includes("area: artwork"));
  assert.ok(labels.includes("log: unavailable"));
});

test("classifies a Japanese report", () => {
  const body = `### PSP のモデル

PSP Go (PSP-N1000)

### どこで問題が発生しましたか？

起動 / ライブラリのスキャン / キャッシュ

### 診断ログの状態

見つけましたが公開したくありません
`;
  const labels = classifyIssue(issue({ title: "[不具合] 起動できません", body }));

  assert.ok(labels.includes("type: bug"));
  assert.ok(labels.includes("language: japanese"));
  assert.ok(labels.includes("model: PSP Go"));
  assert.ok(labels.includes("area: startup"));
  assert.ok(labels.includes("log: private"));
});

test("does not classify an English report as Japanese because of a song title", () => {
  const body = `### PSP model

PSP-2000

### Where did the problem happen?

Starting playback or changing songs

### What happened?

The song titled 花 stopped after ten seconds.

### Diagnostic log status

Not sure
`;
  const labels = classifyIssue(issue({ title: "[Bug] Playback stopped", body }));

  assert.ok(!labels.includes("language: japanese"));
});

test("classifies a positive compatibility report", () => {
  const body = `### PSP model

PSP-2000

### Diagnostic log

Not needed because everything worked
`;
  const labels = classifyIssue(
    issue({ title: "[Compatibility] PSP-2001 with 6.61 ARK-4", body })
  );

  assert.ok(labels.includes("type: compatibility"));
  assert.ok(labels.includes("model: PSP-2000"));
  assert.ok(labels.includes("log: not applicable"));
});

test("preserves a maintainer status when a reporter edits an issue", () => {
  const body = `### PSP model

PSP-2000

### Where did the problem happen?

Somewhere else

### Diagnostic log status

Not sure
`;
  const labels = classifyIssue(
    issue({
      title: "[Bug] Something happened",
      body,
      labels: ["status: investigating", "custom: retained", "model: PSP-1000"],
    })
  );

  assert.ok(labels.includes("status: investigating"));
  assert.ok(!labels.includes("status: needs triage"));
  assert.ok(labels.includes("custom: retained"));
  assert.ok(labels.includes("model: PSP-2000"));
  assert.ok(!labels.includes("model: PSP-1000"));
});

test("plain mentions of the log do not count as later attachments", () => {
  assert.equal(
    hasUploadedLogInComment("Please attach `PSPMAN-HW-DIAG.log` when possible."),
    false
  );
});

test("a later Markdown attachment is detected", () => {
  assert.equal(
    hasUploadedLogInComment(
      "[PSPMAN-HW-DIAG.log](https://github.com/user-attachments/files/123/PSPMAN-HW-DIAG.log)"
    ),
    true
  );
});
