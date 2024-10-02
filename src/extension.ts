import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { removeConsoleLogs } from './removeConsoleLogs';

interface ExtensionSettings {
    includedExtensions: string[];
    excludedFolders: string[];
    excludedFiles: string[];
}

export function activate(context: vscode.ExtensionContext) {
    // Command to remove console logs from current file
    let removeCurrentFile = vscode.commands.registerCommand('extension.removeConsoleLogsCurrent', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        const text = document.getText();
        const updatedText = removeConsoleLogs(text);

        if (text !== updatedText) {
            const edit = new vscode.WorkspaceEdit();
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(text.length)
            );
            edit.replace(document.uri, fullRange, updatedText);
            await vscode.workspace.applyEdit(edit);
            vscode.window.showInformationMessage('Console.log statements removed from current file.✨✅');
        } else {
            vscode.window.showInformationMessage('No console.log statements found in current file.');
        }
    });

    // Command to remove console logs from all files
    let removeAllFiles = vscode.commands.registerCommand('extension.removeConsoleLogsAll', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const settings = getSettings();
        const filesProcessed = await processFiles(rootPath, settings);

        vscode.window.showInformationMessage(`Processed ${filesProcessed} files and removed console.log statements.✨✅`);
    });

    context.subscriptions.push(removeCurrentFile, removeAllFiles);
}

function getSettings(): ExtensionSettings {
    const config = vscode.workspace.getConfiguration('consoleLogRemover');
    return {
        includedExtensions: config.get('includedExtensions', ['.js', '.ts', '.jsx', '.tsx']),
        excludedFolders: config.get('excludedFolders', ['node_modules', 'dist', 'build', '.git']),
        excludedFiles: config.get('excludedFiles', ['config.js', 'config.json', 'package.json', 'package-lock.json'])
    };
}

async function processFiles(dir: string, settings: ExtensionSettings): Promise<number> {
    let filesProcessed = 0;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !settings.excludedFolders.includes(file)) {
            filesProcessed += await processFiles(filePath, settings);
        } else if (stat.isFile() &&
                   settings.includedExtensions.some(ext => file.endsWith(ext)) &&
                   !settings.excludedFiles.includes(file)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const updatedContent = removeConsoleLogs(content);

            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                filesProcessed++;
            }
        }
    }

    return filesProcessed;
}

export function deactivate() {}






