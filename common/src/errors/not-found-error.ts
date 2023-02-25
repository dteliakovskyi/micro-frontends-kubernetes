import { CustomError } from "../models";

export class NotFoundError extends CustomError {
  readonly statusCode = 404;

  constructor(readonly message = "Not found") {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
