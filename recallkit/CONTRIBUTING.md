# Contributing to RecallKit / 参与贡献

Thanks for making learning tools more useful and accessible. / 感谢帮助改进开源学习工具！

RecallKit is currently an early MVP. Please start with a reproducible learner problem, not a feature list.

## Report an issue / 反馈问题

- [Bug report](https://github.com/Tmjiljl/my_study/issues/new?template=bug_report.md)
- [Feature request](https://github.com/Tmjiljl/my_study/issues/new?template=feature_request.md)
- [Open issues](https://github.com/Tmjiljl/my_study/issues)

Search for duplicates first. Provide steps to reproduce, expected behavior and browser version. Use **sample** cards instead of real personal study data. Redact screenshots and never upload private JSON exports.

## Work locally / 本地开发

Requirements: a modern browser and Python 3 for the static server; Node.js 20+ for unit tests.

From the repository root:

```bash
cd recallkit
python3 -m http.server 8080
```

Open http://localhost:8080. In another terminal, run tests from the `recallkit/` directory:

```bash
npm test
```

The site is dependency-free and does not need a build. Its state persists in the browser's localStorage. Test with synthetic data or back up existing cards first.

## Pull requests / 提交 PR

1. For larger changes, discuss the proposed scope in an Issue first.
2. Fork the repository and create a focused branch. All app source is under `recallkit/`.
3. Keep changes small; include tests for scheduler behavior and manual browser steps for UI behavior.
4. Run `npm test`; avoid shipping private data or unrelated dependencies.
5. Open a Pull Request with a clear description, linked Issue, screenshots for visual updates (redacted), and known limitations.
6. Be respectful when reviewing and responding to feedback.

See [MAINTENANCE.md](./MAINTENANCE.md) for how issues, releases, and verified adoption evidence should be handled. Maintainer response times are not guaranteed.

## Privacy and accessibility / 隐私与无障碍

Prefer solutions that work offline, preserve local user control, and remain keyboard accessible. Do not introduce third-party tracking, accounts or data collection without a clear proposal and review. Never include real student records in a PR.

By contributing, you agree that contributions to `recallkit/` are distributed under its [MIT License](./LICENSE).
