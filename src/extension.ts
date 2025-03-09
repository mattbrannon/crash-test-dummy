import vscode from 'vscode';
import Logger from './logger';
import DocumentFormatter from './formatter';
import packageJson from '../package.json';
import { supportedLanguages } from './data';

async function activate(context: vscode.ExtensionContext) {
  for (const language of supportedLanguages) {
    const provider =
      vscode.languages.registerDocumentRangeFormattingEditProvider(language, {
        async provideDocumentRangeFormattingEdits(
          document: vscode.TextDocument,
        ): Promise<vscode.TextEdit[]> {
          return await DocumentFormatter.formatDocument(document);
        },
      });

    context.subscriptions.push(provider);
  }

  Logger.info(packageJson.displayName, 'version', packageJson.version);
}

function deactivate(context: vscode.ExtensionContext) {
  context.subscriptions.forEach((subscription) => subscription.dispose());
  Logger.dispose();
}

export = { activate, deactivate };
