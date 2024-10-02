# Console Log Manager

## Overview

A powerful Visual Studio Code extension that helps you manage console statements in your JavaScript and TypeScript files. **Created by Mohamed Nabih**, this extension now offers six powerful commands to clean up, comment out, or selectively remove different types of console statements from your code.

## Features

### Remove Console Logs

- ✨ Remove `console.log` statements from the current file
- 🚀 Remove `console.log` statements from all files in the project

### Comment Console Logs

- 📝 Comment out `console.log` statements in the current file
- 📚 Comment out `console.log` statements in all project files

### Selective Console Type Removal

- 🎯 Remove selected console types (`log`, `error`, `warn`, `info`, `debug`) from current file
- 🔍 Remove selected console types from all project files

### Additional Features

- ⚙️ Customizable settings for included/excluded files and folders
- 🛡️ Safe operation with clear feedback
- 🎚️ Granular control over which console types to remove

## Usage

1. Open your project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the command palette
3. Choose from six powerful commands:
   - `Remove console.log from Current File`
   - `Remove console.log from All Project Files`
   - `Comment console.log in Current File`
   - `Comment console.log in All Project Files`
   - `Remove Selected Console Types from Current File`
   - `Remove Selected Console Types from All Project Files`

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Console Log Manager"
4. Click Install

## Customization

Customize the extension's behavior via VS Code settings:

```json
{
  "consoleLogRemover.includedExtensions": [".js", ".ts", ".jsx", ".tsx"],
  "consoleLogRemover.excludedFolders": ["node_modules", "dist", "build", ".git"],
  "consoleLogRemover.excludedFiles": ["config.js", "package.json"],

  "consoleRemover.removeLog": true,
  "consoleRemover.removeError": false,
  "consoleRemover.removeWarn": false,
  "consoleRemover.removeInfo": false,
  "consoleRemover.removeDebug": false
}
```

## Why Use Console Log Manager?

- 🎯 **Multiple Operations**: Choose between removing, commenting, or selectively removing console statements
- 🎚️ **Granular Control**: Select which types of console statements to remove
- 📝 **Code Preservation**: Option to comment out console logs instead of removing them
- ⚡ **Fast and Efficient**: Quickly clean up debugging statements before deployment
- 🔒 **Safe**: Excludes sensitive files and folders by default
- 👁️ **Clear Feedback**: Shows how many files were processed and cleaned

## Examples

### Removing Console Logs

```javascript
// Before
console.log("Debugging info");
functionCall();
console.log("More debugging");

// After
functionCall();
```

### Commenting Console Logs

```javascript
// Before
console.log("Debugging info");
functionCall();
console.log("More debugging");

// After
// console.log("Debugging info");
functionCall();
// console.log("More debugging");
```

### Selective Console Type Removal

```javascript
// Before
console.log("Regular log");
console.error("Error message");
console.warn("Warning message");
console.info("Info message");
console.debug("Debug message");

// After (with only console.log and console.error selected for removal)
console.warn("Warning message");
console.info("Info message");
console.debug("Debug message");
```

## About the Developer

Created by **Mohamed Nabih**, a passionate developer focused on creating useful tools for the development community.

## License

This extension is licensed under the MIT License.

## Support

If you encounter any issues or have suggestions, please visit the [GitHub repository](https://github.com/mohamednabih/console-log-remover) to open an issue.

---

Happy coding! 🚀✨
