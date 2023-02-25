import { CustomError } from "../models";

export class InternalError extends CustomError {
  readonly statusCode = 500;

  constructor(readonly message = "Internal Error") {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
