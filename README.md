# Console Manager 🧹✨

## Overview

Console Manager is a powerful Visual Studio Code extension designed to streamline your JavaScript and TypeScript development process. It offers efficient tools for managing `console.log` statements and other console methods in your code, helping you clean up your projects quickly and effectively.

## Features 🚀

- 🗑️ Remove `console.log` statements from the current file or entire project
- 💬 Comment out `console.log` statements instead of removing them
- 🎛️ Customizable settings for included/excluded files and folders
- 🛡️ Safe operation with clear feedback

## Installation 📦

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X on Mac)
3. Search for "Console Manager"
4. Click Install

## Usage 🛠️

### Commands

Access these commands through the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on Mac):

1. `Remove console.log from Current File`
2. `Remove console.log from All Project Files`
3. `Comment console.log in Current File`
4. `Comment console.log in All Project Files`

### Examples

#### Before using Console Manager

```javascript
function calculateTotal(items) {
    console.log('Calculating total...');
    let total = 0;
    for (let item of items) {
        console.log(`Processing item: ${item.name}`);
        total += item.price;
    }
    console.log(`Total calculated: ${total}`);
    return total;
}
```

#### After using "Remove console.log from Current File"

```javascript
function calculateTotal(items) {
    let total = 0;
    for (let item of items) {
        total += item.price;
    }
    return total;
}
```

#### After using "Comment console.log in Current File"

```javascript
function calculateTotal(items) {
    // console.log('Calculating total...');
    let total = 0;
    for (let item of items) {
        // console.log(`Processing item: ${item.name}`);
        total += item.price;
    }
    // console.log(`Total calculated: ${total}`);
    return total;
}
```

## Working with Multiple Files 📁

Console Manager excels at processing multiple files simultaneously, making it perfect for cleaning up entire projects quickly. Here's how it works:

### Example Project Structure

```
my-project/
├── src/
│   ├── main.js
│   ├── utils.js
│   └── components/
│       ├── Header.js
│       └── Footer.js
├── tests/
│   └── test.js
└── config.js
```

### Before Using Console Manager

**src/main.js**

```javascript
import { helper } from './utils';

function main() {
    console.log('Application starting...');
    const result = helper(5);
    console.log('Result:', result);
    return result;
}
```

**src/utils.js**

```javascript
export function helper(x) {
    console.log('Helper function called with:', x);
    return x * 2;
}
```

**src/components/Header.js**

```javascript
function Header() {
    console.log('Rendering header');
    return '<header>Welcome</header>';
}
```

**tests/test.js**

```javascript
function testHelper() {
    console.log('Running tests...');
    const result = helper(3);
    console.log('Test result:', result);
    assert(result === 6);
}
```

### After Using "Remove console.log from All Project Files"

**src/main.js**

```javascript
import { helper } from './utils';

function main() {
    const result = helper(5);
    return result;
}
```

**src/utils.js**

```javascript
export function helper(x) {
    return x * 2;
}
```

**src/components/Header.js**

```javascript
function Header() {
    return '<header>Welcome</header>';
}
```

**tests/test.js**

```javascript
function testHelper() {
    const result = helper(3);
    assert(result === 6);
}
```

Note: `config.js` remains unchanged as it's in the `excludedFiles` list by default.

### Benefits of Bulk Processing

1. **Time-Saving**: Clean up multiple files with a single command.
2. **Consistency**: Ensure all `console.log` statements are removed or commented across your entire project.
3. **Flexible**: Customizable settings allow you to include or exclude specific files or folders.
4. **Pre-Deployment Ready**: Quickly prepare your entire codebase for production by removing debug logs.

### Usage Tips for Multiple Files

- Use the "Remove console.log from All Project Files" command to process the entire project.
- Customize the `excludedFolders` and `excludedFiles` settings to protect specific areas of your project.
- After bulk processing, review changes in your version control system to ensure desired results.
- For large projects, consider running the command on specific folders or file types first to gauge its impact.

By leveraging Console Manager's ability to process multiple files, you can maintain clean, production-ready code across your entire project with minimal effort.

## Configuration ⚙️

Customize the extension's behavior through VS Code settings:

```json
{
  "consoleLogRemover.includedExtensions": [".js", ".ts", ".jsx", ".tsx"],
  "consoleLogRemover.excludedFolders": ["node_modules", "dist", "build", ".git"],
  "consoleLogRemover.excludedFiles": ["config.js", "config.json", "package.json", "package-lock.json"]
}
```

- `includedExtensions`: File types to process
- `excludedFolders`: Folders to ignore
- `excludedFiles`: Specific files to ignore

## Why Use Console Manager? 🤔

- 🎯 **Targeted Cleaning**: Choose between cleaning a single file or the entire project
- ⚡ **Fast and Efficient**: Quickly remove or comment out debugging statements before deployment
- 🔒 **Safe**: Excludes sensitive files and folders by default
- 👁️ **Clear Feedback**: Shows how many files were processed and cleaned

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This extension is licensed under the MIT License.

## Support 💬

If you encounter any issues or have suggestions, please [open an issue](https://github.com/muhammad-nabih/console-manager/issues) on our GitHub repository.

---

Happy coding! 🚀✨
