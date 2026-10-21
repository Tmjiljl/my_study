# RecallKit 📘

**Open-source, local-first review cards for learners.**

RecallKit is a small, dependency-free study tool that helps learners capture mistakes, recall answers before checking them, and revisit weak knowledge at intervals. It works without registration or a backend. The first release is a self-contained Chinese-language web interface; internationalization is on the roadmap.

## What it does
- Create cards with subject, question, and answer.
- Review due cards, reveal the answer, then choose Again / Hard / Good / Easy.
- See daily queue and seven-day review activity.
- Find saved cards using full-text search and a subject filter.
- Export/import JSON backups; study data remains in local browser storage.
- Keyboard shortcuts: `N` creates a card; `Space` reveals; `1`–`4` rates.
- Runs on mobile and desktop, without build dependencies.

## Quick start / 快速开始

Requires a modern browser. Node.js 20+ is only needed for the test suite.

```bash
python3 -m http.server 8080
# Then open http://localhost:8080
```

Alternatively, upload the folder as static files to GitHub Pages. Use `index.html` as the entry point. The remote Google Fonts CSS is optional; system fonts are supported as a fallback.

Run tests:

```bash
npm test
```

## Review schedule
The scheduler uses simple, documented intervals—not FSRS or SM-2. A newly created card is due immediately. Ratings work as follows:

| Rating | Next review |
|---|---|
| Again | Today |
| Hard | Tomorrow |
| Good | 3 days initially, then interval × 1.8 (rounded up) |
| Easy | 7 days initially, then interval × 2.3 (rounded up) |

It is intentionally understandable and open to future experimentation. Current sessions include a snapshot of today's due cards; choosing Again puts a card due *today*, but it reappears in a new session, not immediately in the same session.

## Privacy and limitations
Cards are saved to the browser's `localStorage`. Clearing browser data or changing devices may lose cards unless you export a backup. Exported JSON is not encrypted. Do not store secrets in review cards. No accounts, telemetry, or automatic cloud sync are implemented.

**MVP limitations:** no editing (delete and recreate instead), no multi-device sync, no FSRS optimization, and no hosted demo by default. These are potential roadmap issues, not finished features.

## Roadmap
- [ ] Card editing and bulk operations
- [ ] Encrypted optional sync and multi-device access
- [ ] Import from CSV and standardized spaced repetition formats
- [ ] Internationalization and screen-reader audit
- [ ] Optional embeddable JavaScript review-scheduler package
- [ ] Improve review scheduling with evaluation against opt-in, anonymized datasets

## How to contribute
Issues, bug reports, and pull requests are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) and [SECURITY.md](./SECURITY.md). We welcome contributions from students, educators, and developers.

## Maintainer notes for OSS applications
Real usefulness and ongoing maintenance matter more than repository setup. Do not fabricate GitHub stars, downloads, contributors, or users. Collect opt-in feedback, publish releases, document actual pull request reviews, and explain the real maintenance workload. This MVP alone does **not** establish eligibility or guarantee acceptance into any developer support program.

MIT License — see [LICENSE](./LICENSE).
