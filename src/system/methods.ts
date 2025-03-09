import fs from 'node:fs';
import path from 'node:path';
import vscode from 'vscode';
import Loader from '../loader';
import { rcConfigs, flatConfigs } from '../data';

import { ESLintConfigType, type ESLintConfig } from '../types';

export function getDocumentWorkspace(
  document: vscode.TextDocument,
): string | undefined {
  return vscode.workspace.workspaceFolders?.find((folder) =>
    document.fileName.startsWith(folder.uri.fsPath),
  )?.uri.fsPath;
}

export function traverse(root = getWorkspaceRoot()): string[] {
  return readDir(root)
    .map((file) => (isDirectory(file) ? traverse(file) : file))
    .flat(Infinity as 1)
    .filter((file) => isFile(file));
}

export function getWorkspaceRoot(): string {
  const activeFile = vscode.window.activeTextEditor?.document.fileName;
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (activeFile && workspaceFolders && workspaceFolders.length > 1) {
    return (
      workspaceFolders.find((folder) =>
        activeFile.startsWith(folder.uri.fsPath),
      )?.uri.fsPath || process.cwd()
    );
  }
  return workspaceFolders?.[0].uri.fsPath || process.cwd();
}

export function isDirectory(filepath: string): boolean {
  try {
    return (
      fs.statSync(filepath).isDirectory() && !filepath.includes('node_modules')
    );
  }
 catch (error) {
    return false;
  }
}

export function isFile(filepath: string): boolean {
  try {
    return fs.statSync(filepath).isFile() && !isDeclarationFile(filepath);
  }
 catch (error) {
    return false;
  }
}

export function isDeclarationFile(file: string): boolean {
  return /.*\.d\.[cm]*ts(\.map)?$/.test(file);
}

export function readDir(directory: string): string[] {
  try {
    return fs
      .readdirSync(path.resolve(directory))
      .map((file) => path.resolve(directory, file));
  }
 catch (error) {
    return [];
  }
}

export function getFilesInDirectory(dir: string): string[] {
  return readDir(dir).filter((file) => isFile(file));
}

export function getConfigNames(): string[] {
  const useFlatConfig = vscode.workspace
    .getConfiguration('eslint')
    .get('useFlatConfig');
  const configNames =
    useFlatConfig === true
      ? flatConfigs
      : useFlatConfig === false
        ? rcConfigs
        : [...flatConfigs, ...rcConfigs];
  return configNames;
}

export function getESLintConfigPath(filepath: string): string {
  const configNames = getConfigNames();
  const configPath = searchUp(filepath, configNames);
  if (!configPath) {
    throw new Error('ESLint config path not found');
  }
  return configPath;
}

export function getESLintConfigType(config: ESLintConfig): ESLintConfigType {
  return Array.isArray(config)
    ? ESLintConfigType.FLAT
    : ESLintConfigType.ESLINTRC;
}

export async function getESLintConfig(
  configPath: string,
): Promise<ESLintConfig> {
  return (await Loader.loadModule(configPath, false)) as ESLintConfig;
}

export async function getESLintConfigData(filepath: string): Promise<{
  config: ESLintConfig;
  configPath: string;
  configType: ESLintConfigType;
}> {
  const configPath = getESLintConfigPath(filepath);
  const config = await getESLintConfig(configPath);
  const configType = getESLintConfigType(config);

  // Cache.files.set(filepath, { configPath, configType });
  // Cache.eslintConfigs.set(configPath, config);

  return {
    config,
    configPath,
    configType,
  };
}

export function searchDirectory(
  currentFolder: string,
  fileNames: string[],
): string | undefined {
  const files = getFilesInDirectory(currentFolder);
  const file = fileNames.find((filename) =>
    files.includes(path.resolve(currentFolder, filename)),
  );
  return file ? path.resolve(currentFolder, file) : undefined;
  // return getFilesInDirectory(currentFolder).find((file) => fileNames.includes(path.basename(file)));
}

export function searchUp(
  filepath: string,
  fileNames: string[],
): string | undefined {
  const outOfBounds = path.resolve(getWorkspaceRoot(), '..');
  let currentFolder = isDirectory(filepath) ? filepath : path.dirname(filepath);
  while (currentFolder !== outOfBounds) {
    const matchingFile = searchDirectory(currentFolder, fileNames);
    if (matchingFile) {
      return matchingFile;
    }
    currentFolder = path.dirname(currentFolder);
  }
  return undefined;
}

export function isInWorkspace(filepath: string): boolean {
  return filepath.startsWith(getWorkspaceRoot());
}
