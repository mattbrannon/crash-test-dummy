# [1.3.0](https://github.com/mattbrannon/crash-test-dummy/compare/v1.2.0...v1.3.0) (2025-03-09)


### Features

* add supported file extensions for improved compatibility ([842e5a6](https://github.com/mattbrannon/crash-test-dummy/commit/842e5a6316a39bc13589c109f86bd817bd6fd08b))

# [1.2.0](https://github.com/mattbrannon/crash-test-dummy/compare/v1.1.1...v1.2.0) (2025-03-09)


### Bug Fixes

* update logPath calculation to use System.getWorkspaceRoot() ([ab379d9](https://github.com/mattbrannon/crash-test-dummy/commit/ab379d9d071f277b1820731dfd8254822d623919))


### Features

* add utility functions for workspace and file management; update ESLint path handling ([54d5a72](https://github.com/mattbrannon/crash-test-dummy/commit/54d5a72f0416b1efb7b5f6bcf504f78c76f7b7de))

## [1.1.1](https://github.com/mattbrannon/crash-test-dummy/compare/v1.1.0...v1.1.1) (2025-03-09)


### Bug Fixes

* **test:** enforce no-var and prefer-const rules in ESLint config; update test suite to use Mocha syntax ([800fc5f](https://github.com/mattbrannon/crash-test-dummy/commit/800fc5f86ecc5cfe3cebd12dd1d2da32affb7d20))
* **tests:** increase timeout for Extension Test Suite to improve test reliability ([63dbabd](https://github.com/mattbrannon/crash-test-dummy/commit/63dbabd93cca761b347b5c8b56d4b68c7a728bb7))
* **tests:** remove done callback from document formatting test and add cleanup after tests ([9df08c4](https://github.com/mattbrannon/crash-test-dummy/commit/9df08c4324b51df1814cc78886882dada70154d5))
* **tests:** return result from formatDocument test for improved validation ([1fb6c42](https://github.com/mattbrannon/crash-test-dummy/commit/1fb6c4266e500fffae32a1e55385652b69dea42d))
* **tests:** update document formatting test to use done callback for improved async handling ([19e7042](https://github.com/mattbrannon/crash-test-dummy/commit/19e704261f198834e42167587a78e9952c4b9b4a))
* **tests:** update document formatting test to use done callback for proper async handling ([b95581c](https://github.com/mattbrannon/crash-test-dummy/commit/b95581c36f74537345ce3772e6bc2a0cb61e6a9b))
* **workflow:** enhance testing workflow to support multiple OS environments ([46dc489](https://github.com/mattbrannon/crash-test-dummy/commit/46dc489122a3c3be17a08bc854ad97fd6d6e0860))

# [1.1.0](https://github.com/mattbrannon/crash-test-dummy/compare/v1.0.0...v1.1.0) (2025-03-08)


### Features

* **extension:** enhance activation with document range formatting and logging ([6e64dfd](https://github.com/mattbrannon/crash-test-dummy/commit/6e64dfdd9c6cf5a3d00650c9a79d23c5bd8e1056))
* **formatter:** add PrettierFormatter for document formatting and linting ([0f4b81e](https://github.com/mattbrannon/crash-test-dummy/commit/0f4b81e50e42d3198d7bca4079d695d93f788afc))
* **formatter:** implement DocumentFormatter for integrated document formatting ([1984b46](https://github.com/mattbrannon/crash-test-dummy/commit/1984b46ff4e64a6c811ba5222eee650b4c32415b))
* **formatter:** implement ESLintFormatter for document formatting and linting ([47f40c3](https://github.com/mattbrannon/crash-test-dummy/commit/47f40c324f8bbd3a017698790f8bcb16e2dde2f9))
* **languages:** add supportedLanguages list for document formatting ([7badf0e](https://github.com/mattbrannon/crash-test-dummy/commit/7badf0ea38e12e8f7bd07e1d3787cb6b041ecf92))
* **resolver:** add static instances for ESLint and Prettier modules ([4b678ce](https://github.com/mattbrannon/crash-test-dummy/commit/4b678cee3615dd1f7c863c5c614cb3ea06729936))
* **system:** implement System class for workspace file management and ESLint configuration handling ([302f0c2](https://github.com/mattbrannon/crash-test-dummy/commit/302f0c28f9eff136b22aec787ef2fe92433b7925))
* **types:** add ESLint configuration types for improved type safety ([96d7ce5](https://github.com/mattbrannon/crash-test-dummy/commit/96d7ce5b5ae3cba267afd4ab78c1370018e85061))
* **workflow:** add pull request trigger for release workflow on main branch ([74e2a23](https://github.com/mattbrannon/crash-test-dummy/commit/74e2a232bf8530032114890c082da553ebf438b2))

# 1.0.0 (2025-03-08)


### Features

* **loader:** implement dynamic module loading with JSON support ([bfa7f4d](https://github.com/mattbrannon/crash-test-dummy/commit/bfa7f4d619f99d46003c742d16036da0e004c9b2))
* **logger:** add logger utility for structured output and timestamped messages ([4e09c8f](https://github.com/mattbrannon/crash-test-dummy/commit/4e09c8f0562b4c87ce3729376e93397d1cda9e4e))
* **resolver:** add Resolver class for dynamic module resolution with error logging ([1c092f1](https://github.com/mattbrannon/crash-test-dummy/commit/1c092f1f64c9ce8da51dc38ec5b9fd79a57804ef))

# Change Log

All notable changes to the "crash-test-dummy" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release
