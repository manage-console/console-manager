import * as vscode from 'vscode';

interface ConsoleRemoverSettings {
    removeLog: boolean;
    removeError: boolean;
    removeWarn: boolean;
    removeInfo: boolean;
    removeDebug: boolean;
}

export function removeAllConsoleTypes(text: string, settings: ConsoleRemoverSettings): string {
    const consoleTypes = [];
    if (settings.removeLog) consoleTypes.push('log');
    if (settings.removeError) consoleTypes.push('error');
    if (settings.removeWarn) consoleTypes.push('warn');
    if (settings.removeInfo) consoleTypes.push('info');
    if (settings.removeDebug) consoleTypes.push('debug');

    const consoleRegex = new RegExp(`console\\.(${consoleTypes.join('|')})\\s*\\(.*?\\);?`, 'g');
    return text.replace(consoleRegex, '');
}

export function registerRemoveAllConsoleTypesCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.removeAllConsoleTypes', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();

            const config = vscode.workspace.getConfiguration('consoleRemover');
            const settings: ConsoleRemoverSettings = {
                removeLog: config.get('removeLog', true),
                removeError: config.get('removeError', false),
                removeWarn: config.get('removeWarn', false),
                removeInfo: config.get('removeInfo', false),
                removeDebug: config.get('removeDebug', false)
            };

            const updatedText = removeAllConsoleTypes(text, settings);

            if (text !== updatedText) {
                const edit = new vscode.WorkspaceEdit();
                edit.replace(
                    document.uri,
                    new vscode.Range(0, 0, document.lineCount, 0),
                    updatedText
                );
                await vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage('Selected console statements have been removed.✨✅');
            } else {
                vscode.window.showInformationMessage('No matching console statements found to remove.');
            }
        }
    });

    context.subscriptions.push(disposable);
}
