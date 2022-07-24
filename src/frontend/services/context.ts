import { Config, config } from "../../shared/core/config";
import { builder as repositoriesBuilder } from "./repositories";
import { builder as usecaseBuilder } from "./usecases";
import { builder as viewmodelBuilder } from "./viewmodels";

class Context {
  private _repositories!: ReturnType<typeof repositoriesBuilder>;
  get repositories() {
    return this._repositories;
  }

  private _useCases!: ReturnType<typeof usecaseBuilder>;
  get usecases() {
    return this._useCases;
  }

  private _viewModels!: ReturnType<typeof viewmodelBuilder>;
  get viewmodels() {
    return this._viewModels;
  }

  readonly config: Config;
  constructor(config: Config) {
    this.config = config;
  }

  readonly isBrowser = !!globalThis.window;

  init() {
    this._repositories = repositoriesBuilder(this);
    this._useCases = usecaseBuilder(this);
    this._viewModels = viewmodelBuilder(this);
  }
}

const context = new Context(config);
context.init();

export { context, type Context };
