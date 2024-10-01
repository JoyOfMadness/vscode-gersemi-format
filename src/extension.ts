import * as vscode from 'vscode';
import { dirname } from 'path';
import { execFileSync } from 'child_process';

function formatDocument(document: vscode.TextDocument, selectedRange: vscode.Range): vscode.TextEdit[] {
	const config = vscode.workspace.getConfiguration('gersemi');
	const programPath = config.get<string>("programPath") || "gersemi";
	const programArgs = [...config.get<string[]>("programArgs", []), "-"];
	const programWorkDir = config.get<string>("currentWorkingDirectory") || dirname(document.uri.fsPath);

	console.log(`Running gersemi on path '${programPath}' with args '${programArgs.join(" ")}' and CWD set to '${programWorkDir}'`);
	const formattedText = execFileSync(programPath, programArgs, {
		cwd: programWorkDir,
		input: document.getText(selectedRange),
		encoding: 'utf8'
	});

	return [vscode.TextEdit.replace(selectedRange, formattedText)];
}

export function activate(context: vscode.ExtensionContext) {
	vscode.languages.registerDocumentFormattingEditProvider('cmake', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.ProviderResult<vscode.TextEdit[]> {
			const wholeDocumentRange = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
			return formatDocument(document, wholeDocumentRange);
		}
	});

	vscode.languages.registerDocumentRangeFormattingEditProvider('cmake', {
		provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
			return formatDocument(document, range);
		}
	});
}
