# PSPMAN Support and Issue Tracker

This is the public support and issue tracker for **PSPMAN**, a Walkman-inspired FLAC music player for Sony PSP.

PSPMAN's application source and internal engineering repository are private. This repository exists so anyone can report a problem, share a compatibility result, ask for help, or suggest an improvement.

## Start here

You do not need technical experience. Choose the option that sounds closest to what you need and write **“I don't know”** wherever you are unsure.

| What do you need? | Open this form |
| --- | --- |
| PSPMAN crashed, froze, behaved incorrectly, or would not play something | [Report a PSPMAN problem](https://github.com/obsoletesony/PSPMAN-Issues/issues/new?template=01-bug-report.yml) |
| 日本語で不具合を報告したい | [日本語の不具合報告フォーム](https://github.com/obsoletesony/PSPMAN-Issues/issues/new?template=02-bug-report-ja.yml) |
| You tested a PSP model or firmware and want to share whether it works | [Share a compatibility result](https://github.com/obsoletesony/PSPMAN-Issues/issues/new?template=03-compatibility-report.yml) |
| You are stuck or are not sure whether something is a bug | [Ask for help](https://github.com/obsoletesony/PSPMAN-Issues/issues/new?template=04-help-request.yml) |
| You have an idea for PSPMAN | [Suggest an improvement](https://github.com/obsoletesony/PSPMAN-Issues/issues/new?template=05-feature-request.yml) |

A free GitHub account is required to submit a report.

## The diagnostic log

PSPMAN Public Alpha records diagnostic information **locally** on your Memory Stick. Nothing is uploaded or sent to ObsoleteSony automatically.

The file is named:

`PSPMAN-HW-DIAG.log`

Open the Memory Stick on a computer and look at its top level, also called the **root**. The log appears beside the `PSP` folder, not inside it.

**Copy the log before starting PSPMAN again. Each launch replaces the previous log.**

Attaching the log is strongly recommended because it often shows what PSPMAN was doing immediately before the problem. A report without a log is still welcome.

## Public reports and privacy

Everything posted in this repository, including attachments, is public.

Before uploading a diagnostic log, quickly review it for information you do not want to publish. A log may contain song names, file names, or paths from your library.

Please do not upload:

- Copyrighted music or complete music files
- A copy of your Memory Stick
- Passwords, account details, or other private information
- Private source code or internal development material

For a song-specific problem, the artist, title, file size, sample rate, bit depth, channel count, and cover details are normally enough. Keep the affected file unchanged until the report has been reviewed, because converting it or replacing its cover can remove the condition that caused the problem.

## What happens after you submit

Your report will be labelled automatically so it can be sorted by PSP model, affected area, and diagnostic-log availability. A maintainer may ask for clarification or a second test.

Confirmed work is tracked privately. Public issues can be referenced and closed from the private engineering repository without exposing PSPMAN's source code.

## Useful links

- [PSPMAN website](https://www.obsoletesony.com/pspman)
- [Report-a-bug guide](https://www.obsoletesony.com/pspman/report-a-bug)
- [PSPMAN User's Guide](https://www.obsoletesony.com/downloads/PSPMAN-User-Guide.pdf)
- [All open reports](https://github.com/obsoletesony/PSPMAN-Issues/issues)

PSPMAN is an independent ObsoleteSony project and is not affiliated with or endorsed by Sony.
