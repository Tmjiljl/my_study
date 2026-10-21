# Maintenance and community process / 维护与社区流程

RecallKit is an early-stage open-source project. This document describes **intended processes**, not evidence that people have already used or contributed to the project.

## Reporting and triage / 问题处理

1. Report reproducible bugs or feature proposals through [repository Issues](https://github.com/Tmjiljl/my_study/issues/new/choose).
2. Search existing reports first. Do not upload private study cards, raw JSON backups, personal details, secrets, or unredacted screenshots.
3. Maintainers triage when available: confirm reproduction, clarify expected behavior, mark duplicates, and prioritize by severity and real user impact. There is no guaranteed response SLA.
4. Keep issue state and resolution linked to actual commits or PRs. Close only when resolved or with a clearly documented reason.
5. Test changes and check keyboard/mobile impact before merges and releases.

## Contributor-friendly work / 对新贡献者友好

Pick a small, clearly-scoped issue; comment before starting substantial work to avoid duplicated effort. Send focused pull requests with tests and clear reproduction or acceptance steps. Reviewers should give actionable, respectful feedback.

## Releases / 版本发布

Prefer releases that ship a tested change and an honest changelog. Tag versions with semantic versioning when appropriate. Never backdate or artificially inflate releases or commit activity.

## Measuring real adoption / 真实影响记录

If reporting progress in grant or OSS applications, use only independently verifiable public evidence and consent-based feedback: issue/PR history, actual release notes, genuine user comments, reproducible bugs fixed, documented maintenance work, and truthful project usage where available.

Do **not** fabricate stars, forks, contributors, reviews, downloads, survey submissions or testimonials. No tracking/analytics are currently configured in the app.

## Current product limitations / 现有功能限制

As of MVP v0.1.0:
- No in-place card editing or cross-device sync
- All cards live in browser localStorage; browser clearing can erase them
- JSON backups are unencrypted and may contain private notes
- Browser end-to-end tests and accessibility review are future work
- The app has no known verified third-party user base yet
