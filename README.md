# RecallKit · Open-source study review

**[Try RecallKit online](https://tmjiljl.github.io/my_study/)** · [Source code](./recallkit/) · [Report a bug](../../issues/new?template=bug_report.md) · [Suggest a feature](../../issues/new?template=feature_request.md)

RecallKit is a free, local-first review card app for students and lifelong learners. No account, database, or backend is required.

## Features / 功能

- Create knowledge cards grouped by subject / 按学科创建知识卡片
- Review due cards with transparent spaced intervals / 间隔复习
- Track recent review activity / 学习概览
- Search and filter cards / 搜索筛选
- Export and import JSON backups / JSON 备份与恢复
- Responsive design; browser-local storage by default / 移动端适配，本地存储

## Get involved / 参与开源

We welcome **genuine** bug reports, thoughtful feature proposals, accessibility feedback and pull requests.

- [Bug report](../../issues/new?template=bug_report.md) · [功能建议](../../issues/new?template=feature_request.md)
- [Open issues](../../issues) · [Pull requests](../../pulls)
- [Contributing guide](./recallkit/CONTRIBUTING.md)
- [Security and privacy](./recallkit/SECURITY.md)
- [Roadmap and limitations](./recallkit/README.md#roadmap)

Before opening an issue, search for duplicates. Please remove all personal study information from screenshots, backups and bug reports.

## Run locally

```bash
cd recallkit
python3 -m http.server 8080
```

Open http://localhost:8080. To run unit tests (Node.js 20+): `npm --prefix recallkit test` from the repository root.

## Project status

RecallKit v0.1.0 is an early MVP. It does **not** yet offer card editing, user accounts, server sync or an independently verified user base. Data is stored locally in your browser; export backups regularly.

The application under `recallkit/` has its own **MIT license**; see [recallkit/LICENSE](./recallkit/LICENSE). The repository's root [LICENSE](./LICENSE) is separate. Do not assume they cover the same files.

Maintained at [Tmjiljl/my_study](https://github.com/Tmjiljl/my_study). Community feedback and contributions are welcome; maintainers will document real work without manufacturing engagement metrics.
