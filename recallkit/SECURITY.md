# Security Policy

RecallKit runs in the user's browser and stores cards in localStorage. It does not send card content to a server. Exported backup files contain user-written study data and should be stored securely. Imports have size and schema checks, and all user text is inserted into the DOM using textContent.

Please do not publicly post vulnerabilities that expose user data. Contact project maintainers privately through their published profile contact information until a security reporting channel is configured.

**Important:** Browser storage can be cleared. Export regular backups. This is not encrypted storage and should not hold secrets.
