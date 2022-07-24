import { SecretConfig, secretConfig } from "../core/secretConfig";
import { builder as repositoriesBuilder } from "./repositories";
import { builder as usecaseBuilder } from "./usecases";

class Context {
  private _repositories!: ReturnType<typeof repositoriesBuilder>;
  get repositories() {
    return this._repositories;
  }

  private _useCases!: ReturnType<typeof usecaseBuilder>;
  get usecases() {
    return this._useCases;
  }

  readonly secretConfig: SecretConfig;
  constructor(secretConfig: SecretConfig) {
    this.secretConfig = secretConfig;
  }
}

const context = new Context(secretConfig);

export { context, type Context };