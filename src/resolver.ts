import Module = require('node:module');
import Logger from './logger';

class Resolver {
  moduleName: string;
  static eslint: InstanceType<typeof Resolver>;
  static prettier: InstanceType<typeof Resolver>;
  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  static {
    this.eslint = Resolver.make('eslint');
    this.prettier = Resolver.make('prettier');
  }

  static make(moduleName: string) {
    return new Resolver(moduleName);
  }

  resolve(filepath: string) {
    try {
      return Module.createRequire(filepath).resolve(this.moduleName);
    }
 catch (error) {
      const e = error as Error;
      Logger.error(`[${this.moduleName}]: ${e.message}`);
      return null;
    }
  }

  require(filepath: string) {
    try {
      const modulePath = this.resolve(filepath);
      Logger.info(`Loaded ${this.moduleName} from: file://${modulePath}`);
      return require(modulePath!);
    }
 catch (error) {
      const e = error as Error;
      Logger.error(`[${this.moduleName}]: ${e.message}`);
      return null;
    }
  }
}

export default Resolver;
