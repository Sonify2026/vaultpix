# Security Policy

## Credentials

VaultPix stores configured object-storage credentials in the current vault at `.obsidian/plugins/vaultpix/data.json`. Credentials are not copied into notes, manifests, migration records, or application logs.

- Never commit or share `data.json`.
- Use a dedicated least-privilege cloud identity for VaultPix.
- Rotate credentials immediately if they appear in a screenshot, log, issue, commit, or public sync.
- Do not use root-account or owner-account AccessKeys.

## Data safety model

- Markdown is replaced only after upload and optional public-URL verification succeed.
- Multi-image note changes are written as one verified update.
- Migration failures restore modified notes from in-memory or recorded backups.
- Local source images are backed up by default instead of permanently deleted.
- Dry runs do not upload, modify notes, or move files.
- Rollback restores local notes and files but intentionally does not delete remote objects.

## Reporting a vulnerability

Open a private GitHub security advisory for the repository. Do not include real credentials, private Vault content, or live private URLs. If a secret may have been exposed, revoke it before reporting the problem.
