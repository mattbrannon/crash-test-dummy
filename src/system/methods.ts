import fs from 'node:fs';
import path from 'node:path';
import vscode from 'vscode';
import Loader from '../loader';
import { rcConfigs, flatConfigs } from '../data';
import fsp from 'node:fs/promises';

import { ESLintConfigType, type ESLintConfig } from '../types';

export function getDocumentWorkspace(
  document: vscode.TextDocument,
): string | undefined {
  return vscode.workspace.workspaceFolders?.find((folder) =>
    document.fileName.startsWith(folder.uri.fsPath),
  )?.uri.fsPath;
}

export async function traverse(root = getWorkspaceRoot()): Promise<string[]> {
  const files = await readDir(root);
  const directories = files.filter((file) => isDirectory(file));
  const nestedFiles = await Promise.all(
    directories.map((directory) => traverse(directory)),
  );
  return files.concat(...nestedFiles).filter((file) => isFile(file));
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

export async function readDir(directory: string): Promise<string[]> {
  try {
    return fsp
      .readdir(path.resolve(directory))
      .then((files) => files.map((file) => path.resolve(directory, file)));
  }
 catch (error) {
    return [];
  }
}

export async function getFilesInDirectory(dir: string): Promise<string[]> {
  return (await readDir(dir)).filter((file) => isFile(file));
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

export async function getESLintConfigPath(filepath: string): Promise<string> {
  const configNames = await getConfigNames();
  const configPath = await searchUp(filepath, configNames);
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
  const configPath = await getESLintConfigPath(filepath);
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

export async function searchDirectory(
  currentFolder: string,
  fileNames: string[],
): Promise<string | undefined> {
  const files = await getFilesInDirectory(currentFolder);
  const file = fileNames.find((filename) =>
    files.includes(path.resolve(currentFolder, filename)),
  );
  return file ? path.resolve(currentFolder, file) : undefined;
  // return getFilesInDirectory(currentFolder).find((file) => fileNames.includes(path.basename(file)));
}

export async function searchUp(
  filepath: string,
  fileNames: string[],
): Promise<string | undefined> {
  const outOfBounds = path.resolve(getWorkspaceRoot(), '..');
  let currentFolder = isDirectory(filepath) ? filepath : path.dirname(filepath);
  while (currentFolder !== outOfBounds) {
    const matchingFile = await searchDirectory(currentFolder, fileNames);
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
