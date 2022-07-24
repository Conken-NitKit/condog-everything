import { Result } from "./repositories";

export type Usecase<Entity, Payload> = {
  invoke(payload: Payload): Promise<Result<Entity>>;
};
