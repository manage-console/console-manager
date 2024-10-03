# Change Log

All notable changes to the "Console Manager" extension will be documented in this file.

## [1.0.2] - 2024-10-03

### Changed

- Improved `removeConsoleLogs` function to handle both commented and uncommented `console.log` statements.
- `removeConsoleLogs` now removes only the `console.log` statements without affecting nearby code or entire lines.
- Restructured code for better organization and maintainability.

## [1.0.1] - 2024-10-03

- Minor bug fixes and performance improvements.

## [1.0.0] - 2024-10-03

- Initial release
- Introduced core functionality for managing `console.log` statements in JavaScript and TypeScript files.
- Added options to:
  - Remove `console.log` statements from the current file or all project files.
  - Comment out `console.log` statements instead of removing them.
- Implemented customizable settings for included/excluded files and folders.
- Provided clear feedback during operations for user safety.
