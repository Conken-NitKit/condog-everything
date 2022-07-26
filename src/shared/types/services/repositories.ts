import { ErrorObject } from "./../../../shared/core/error";

export interface Repository {}

export interface RepositoryConstructor<C, T extends Repository> {
  (context: Readonly<C>): T;
}

export type Result<T = {}> =
  | { success: true }
  | {
      success: true;
      data: T;
    }
  | { success: false; error: ErrorObject };
