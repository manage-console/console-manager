import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { removeConsoleLogs } from './removeConsoleLogs';
import { commentConsoleLogs } from './commentConsoleLogs';
import { removeAllConsoleTypes } from './removeAllConsoleTypes';

interface ExtensionSettings {
    includedExtensions: string[];
    excludedFolders: string[];
    excludedFiles: string[];
}

interface ConsoleRemoverSettings {
    removeLog: boolean;
    removeError: boolean;
    removeWarn: boolean;
    removeInfo: boolean;
    removeDebug: boolean;
}

export function activate(context: vscode.ExtensionContext) {
    // Remove Console Logs Commands
    registerCommand(
        context,
        'extension.removeConsoleLogsCurrent',
        removeConsoleLogsFromCurrentFile
    );
    registerCommand(
        context,
        'extension.removeConsoleLogsAll',
        removeConsoleLogsFromAllFiles
    );

    // Comment Console Logs Commands
    registerCommand(
        context,
        'extension.commentConsoleLogsCurrent',
        commentConsoleLogsInCurrentFile
    );
    registerCommand(
        context,
        'extension.commentConsoleLogsAll',
        commentConsoleLogsInAllFiles
    );

    // Remove All Console Types Commands
    registerCommand(
        context,
        'extension.removeAllConsoleTypesCurrent',
        removeAllConsoleTypesFromCurrentFile
    );
    registerCommand(
        context,
        'extension.removeAllConsoleTypesAll',
        removeAllConsoleTypesFromAllFiles
    );
}

function registerCommand(
    context: vscode.ExtensionContext,
    commandId: string,
    callback: (...args: any[]) => any
) {
    let disposable = vscode.commands.registerCommand(commandId, callback);
    context.subscriptions.push(disposable);
}

// Remove Console Logs Functions
async function removeConsoleLogsFromCurrentFile() {
    await processCurrentFile(removeConsoleLogs);
}

async function removeConsoleLogsFromAllFiles() {
    await processAllFiles(removeConsoleLogs);
}

// Comment Console Logs Functions
async function commentConsoleLogsInCurrentFile() {
    await processCurrentFile(commentConsoleLogs);
}

async function commentConsoleLogsInAllFiles() {
    await processAllFiles(commentConsoleLogs);
}

// Remove All Console Types Functions
async function removeAllConsoleTypesFromCurrentFile() {
    const settings = getConsoleRemoverSettings();
    await processCurrentFile((text) => removeAllConsoleTypes(text, settings));
}

async function removeAllConsoleTypesFromAllFiles() {
    const settings = getConsoleRemoverSettings();
    await processAllFiles((text) => removeAllConsoleTypes(text, settings));
}

// Utility Functions
async function processCurrentFile(processor: (text: string) => string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    const text = document.getText();
    const updatedText = processor(text);

    if (text !== updatedText) {
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );
        edit.replace(document.uri, fullRange, updatedText);
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage('Operation completed successfully.✨✅');
    } else {
        vscode.window.showInformationMessage('No changes were necessary.');
    }
}

async function processAllFiles(processor: (text: string) => string) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const settings = getSettings();
    const filesProcessed = await processFiles(rootPath, settings, processor);

    vscode.window.showInformationMessage(`Processed ${filesProcessed} files successfully.✨✅`);
}

async function processFiles(
    dir: string,
    settings: ExtensionSettings,
    processor: (text: string) => string
): Promise<number> {
    let filesProcessed = 0;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !settings.excludedFolders.includes(file)) {
            filesProcessed += await processFiles(filePath, settings, processor);
        } else if (
            stat.isFile() &&
            settings.includedExtensions.some(ext => file.endsWith(ext)) &&
            !settings.excludedFiles.includes(file)
        ) {
            const content = fs.readFileSync(filePath, 'utf8');
            const updatedContent = processor(content);

            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                filesProcessed++;
            }
        }
    }

    return filesProcessed;
}

function getSettings(): ExtensionSettings {
    const config = vscode.workspace.getConfiguration('consoleLogRemover');
    return {
        includedExtensions: config.get('includedExtensions', ['.js', '.ts', '.jsx', '.tsx']),
        excludedFolders: config.get('excludedFolders', ['node_modules', 'dist', 'build', '.git']),
        excludedFiles: config.get('excludedFiles', ['config.js', 'config.json', 'package.json', 'package-lock.json'])
    };
}

function getConsoleRemoverSettings(): ConsoleRemoverSettings {
    const config = vscode.workspace.getConfiguration('consoleRemover');
    return {
        removeLog: config.get('removeLog', true),
        removeError: config.get('removeError', false),
        removeWarn: config.get('removeWarn', false),
        removeInfo: config.get('removeInfo', false),
        removeDebug: config.get('removeDebug', false)
    };
}

export function deactivate() {}
