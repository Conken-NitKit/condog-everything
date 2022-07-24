export type ErrorObject = {
  status: number;
  description: string;
  cause?: Error;
};
