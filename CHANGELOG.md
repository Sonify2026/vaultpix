# Changelog

All notable changes to VaultPix are documented here.

## 1.3.0 - 2026-09-18

### Changed

- New installations preserve original image bytes by default; lossy conversion and resizing now require an explicit choice. Existing vault settings remain unchanged.
- Settings explain the visual impact of lossy codecs, resizing, and the exact-byte original mode.

### Fixed

- Reject silent browser encoder fallback to a different MIME type; use high-quality interpolation when resizing.
- Scope processed-image deduplication to the provider, endpoint, bucket, and public base URL instead of reusing stale destinations.
- Respect the configured Hash length in templates and probe each generated remote conflict path before uploading.
- Serialize concurrent uploads targeting the same remote path so two images in one batch cannot silently overwrite each other.
- Protect post-migration note edits during rollback and recovery; detect conflicts before restoring any note.
- Avoid recording uploaded images in the asset manifest before Markdown replacement succeeds, and allow stores to recover after an isolated write failure.

### Verified

- Added regression coverage for byte preservation, encoder fallback, destination-scoped deduplication, remote collisions, and recovery safety.

## 1.2.0 - 2026-08-31

### Fixed

- Corrected setup-step checkmark and number centering by removing the conflicting global span rule.
- Restored comfortable horizontal padding for all settings rows and matching mobile spacing.
- Fixed fill/fixed resize modes so “prevent upscale” works when either target axis would enlarge the image.
- Preserved GIF/SVG by MIME type as well as filename extension and rendered transparent images onto white when exporting JPEG.
- Replaced the approximate naming preview with the real template engine and stabilized timestamps/UUIDs across filename and path rendering.
- Fixed `image-upload: false` so it disables cloud upload without disabling local optimization.

### Changed

- Local optimization and naming is now the default mode and never prompts for upload configuration.
- Setup guidance, uploader status, naming fields, and diagnostics adapt to local, cloud, and on-demand modes.
- “Process all images in this note” now follows the selected mode; local mode creates optimized local files, safely updates references, and keeps originals.

## 1.1.0 - 2026-08-28

### Added

- Rebranded the plugin as **VaultPix · 云图匣**.
- Added a first-class Alibaba Cloud OSS provider with safe defaults and automatic URL generation.
- Added global and per-image left, center, right, and theme-default alignment.
- Added provider-specific setup help, connection state, configuration previews, and responsive settings sections.
- Added complete setup, security, OSS, R2, development, and release documentation.
- Added CI, tag-based GitHub releases, provider tests, and issue templates.

### Improved

- Corrected setup-step number and icon centering.
- Increased section content padding while removing redundant nested row indentation.
- Improved settings hierarchy, descriptions, empty states, focus treatment, and reduced-motion behavior.
- Updated default local backup directory to `.vaultpix-backup/`.

## 1.0.0 - 2026-08-28

- Initial image processing, S3/R2 upload, safe Markdown replacement, migration, rollback, manifest, and recovery implementation.
