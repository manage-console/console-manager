import * as vscode from 'vscode';

export function commentConsoleLogs(text: string): string {
    // Regular expression to match console.log statements
    const consoleLogRegex = /(console\.log\(.*?\);?)/g;

    // Replace console.log statements with commented versions
    return text.replace(consoleLogRegex, (match) => {
        // Check if the line is already commented
        if (match.trim().startsWith('//')) {
            return match; // Leave already commented lines as they are
        }
        return `// ${match}`; // Comment out the console.log statement
    });
}

// Modify the existing command or create a new one
export function registerCommentConsoleLogsCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.commentConsoleLogs', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            const commentedText = commentConsoleLogs(text);

            if (text !== commentedText) {
                const edit = new vscode.WorkspaceEdit();
                edit.replace(
                    document.uri,
                    new vscode.Range(0, 0, document.lineCount, 0),
                    commentedText
                );
                await vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage('Console.log statements have been commented out.✨✅');
            } else {
                vscode.window.showInformationMessage('No console.log statements found to comment.');
            }
        }
    });

    context.subscriptions.push(disposable);
}
