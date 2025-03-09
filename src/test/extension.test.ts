import assert from 'node:assert';
import path from 'node:path';
import vscode from 'vscode';
import DocumentFormatter from '../formatter';
import packageJson from '../../package.json';
import Mocha from 'mocha';

Mocha.suite('Extension Test Suite', () => {
  const extensionId = `${packageJson.publisher}.${packageJson.name}`;
  Mocha.test('Extension is activated', async () => {
    const extension = vscode.extensions.getExtension(extensionId);
    await extension?.activate();
    assert.ok(extension?.isActive);
  });

  Mocha.test('Formats a document', async () => {
    const filepath = vscode.Uri.file(
      path.resolve(process.cwd(), 'src/test/sample-file.ts'),
    );
    const document = await vscode.workspace.openTextDocument(filepath);
    const editor = await vscode.window.showTextDocument(document);
    await editor.edit((editBuilder) => {
      editBuilder.insert(new vscode.Position(0, 0), 'var foo = 1');
    });
    const expected = 'const foo = 1;\n';
    const result = await DocumentFormatter.formatDocument(document);

    assert.equal(expected, result[0].newText);
  });
});

Mocha.after((fn) => {
  vscode.window.activeTextEditor?.edit((editBuilder) => {
    const firstLine = vscode.window.activeTextEditor?.document.lineAt(0);
    const lastLine = vscode.window.activeTextEditor?.document.lineAt(
      vscode.window.activeTextEditor?.document.lineCount - 1,
    );
    if (!firstLine || !lastLine) {
      process.exit(0);
    }
    const fullRange = new vscode.Range(
      firstLine?.range.start,
      lastLine?.range.end,
    );
    editBuilder.replace(fullRange, '');
  });
  fn();
});
