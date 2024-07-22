import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.info("[INFO] k6-ide sucessfully started");

  const getWebviewContent = async () => {
    return vscode.workspace.workspaceFolders
      ? await vscode.workspace.fs.readFile(
          vscode.Uri.file(
            vscode.workspace.workspaceFolders[0].uri.fsPath +
              "/test-results/k6.html"
          )
        )
      : null;
  };

  const testResults = vscode.commands.registerCommand(
    "k6-ide.viewTestResults",
    async () => {
      const panel = vscode.window.createWebviewPanel(
        "viewTestResults",
        "Test Results - k6",
        vscode.ViewColumn.Beside,
        {}
      );
      const webviewContent = await getWebviewContent();
      webviewContent !== null
        ? (panel.webview.html = webviewContent.toString())
        : vscode.window.showInformationMessage(
            "A folder/workspace has not been opened yet"
          );
    }
  );

  context.subscriptions.push(testResults);
}

export function deactivate() {}
