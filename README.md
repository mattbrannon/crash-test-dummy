# Crash Test Dummy

A Visual Studio Code extension for testing continuous integration, auto-publishing, and semantic versioning.

This extension doesn't really do anything other than allow me to test the CI/CD pipeline and semantic versioning with GitHub Actions and semantic-release.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Compile the extension with:

```
npm run compile
```

4. Launch the extension in VS Code by pressing `F5`.

## Usage

- Activate the extension by running the command **Crash Test Dummy: Hello World** from the Command Palette.
- The extension logs activity to an output channel named after the extension for diagnostic purposes.

## Development

- **Testing:** Run tests using:
  ```
  npm test
  ```
- **Linting:** Check code style with:
  ```
  npm run lint
  ```
- **Watch mode:** Automatically compile on changes with:
  ```
  npm run watch
  ```
- **Packaging:** Create a VSIX package with:
  ```
  npm run package
  ```

## Release & CI

- Build and release are managed by GitHub Actions workflows in the `.github/workflows` directory.
- Semantic release is integrated using `semantic-release` and `semantic-release-vsce` for automatic versioning and publishing.

## License

This project is provided as-is without any explicit license.
