# Contributing to VaultPix

## Local development

Requirements: Node.js 22 or later and npm.

```bash
npm ci
npm run check
npm run build
```

For live development, run `npm run dev` and copy or link the project output into a test Vault. Never develop against your only production Vault.

## Pull requests

- Keep changes focused and explain the user-visible behavior.
- Add or update tests for logic changes.
- Verify light and dark Obsidian themes for UI changes.
- Preserve keyboard focus, responsive behavior, and native Obsidian controls.
- Update README, configuration docs, and changelog when behavior changes.
- Never include `data.json`, AccessKeys, private URLs, Vault notes, or user images.

## Release checklist

1. Update versions in `manifest.json`, `package.json`, `package-lock.json`, and `versions.json`.
2. Update `CHANGELOG.md`.
3. Run `npm run release:verify`.
4. Confirm `main.js`, `manifest.json`, and `styles.css` contain no credentials.
5. Commit, tag as `v<version>`, and push the tag.
