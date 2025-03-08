import vscode from 'vscode';
import PrettierFormatter from './prettier';
import ESLintFormatter from './eslint';
import Logger from '../logger';
import System from '../system';

class DocumentFormatter {
  document: vscode.TextDocument;
  constructor(document: vscode.TextDocument) {
    this.document = document;
  }

  static async formatDocument(
    document: vscode.TextDocument,
  ): Promise<vscode.TextEdit[]> {
    if (!vscode.window.activeTextEditor) {
      Logger.warning('No active text editor', document.fileName);
      return [];
    }

    if (!System.isInWorkspace(document.fileName)) {
      Logger.warning('Document is not in the workspace', document.fileName);
      return [];
    }

    Logger.clear();

    try {
      const prettierFormatter = new PrettierFormatter(document);
      const eslintFormatter = new ESLintFormatter(document);

      const prettierOutput = await prettierFormatter.formatDocument();
      const eslintOutput = await eslintFormatter.formatString(prettierOutput);

      Logger.info(`Document formatted: file://${document.fileName}`);

      const firstLine = document.lineAt(0);
      const lastLine = document.lineAt(document.lineCount - 1);
      const fullRange = new vscode.Range(
        firstLine.range.start,
        lastLine.range.end,
      );

      return [vscode.TextEdit.replace(fullRange, eslintOutput)];
    }
 catch (error) {
      Logger.error('Error formatting document', error);
      throw error;
    }
  }
}

export = DocumentFormatter;
