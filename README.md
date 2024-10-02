# Console Log Remover

## Overview

A lightweight Visual Studio Code extension that effortlessly removes `console.log` statements from your JavaScript and TypeScript files. Created by Mohamed Nabih, this extension offers two simple yet powerful commands to clean up your code before deployment.

## Features

- ✨ Remove console.log statements from the current file only
- 🚀 Remove console.log statements from all files in the project
- ⚙️ Customizable settings for included/excluded files and folders
- 🛡️ Safe operation with clear feedback

## Usage

1. Open your project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the command palette
3. Choose one of two commands:
   - `Remove Console Logs (Current File)` - Removes console.logs from the active file
   - `Remove Console Logs (All Files)` - Removes console.logs from all files in the project

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Console Log Remover"
4. Click Install

## Customization

Customize the extension's behavior via VS Code settings:

```json
{
  "consoleLogRemover.includedExtensions": [".js", ".ts", ".jsx", ".tsx"],
  "consoleLogRemover.excludedFolders": ["node_modules", "dist", "build", ".git"],
  "consoleLogRemover.excludedFiles": ["config.js", "package.json"]
}
```

## Why Use Console Log Remover?

- 🎯 **Targeted Cleaning**: Choose between cleaning a single file or the entire project
- ⚡ **Fast and Efficient**: Quickly remove debugging statements before deployment
- 🔒 **Safe**: Excludes sensitive files and folders by default
- 👁️ **Clear Feedback**: Shows how many files were processed and cleaned

## About the Developer

Created by **Mohamed Nabih**, a passionate developer focused on creating useful tools for the development community.

## License

This extension is licensed under the MIT License.

## Support

If you encounter any issues or have suggestions, please visit the [GitHub repository](https://github.com/mohamednabih/console-log-remover) to open an issue.

---

Happy coding! 🚀✨
