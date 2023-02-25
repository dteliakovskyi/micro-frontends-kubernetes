import { CustomError } from "../models";

export class NotAuthorizedError extends CustomError {
  readonly statusCode = 401;

  constructor(readonly message = "Not authorized") {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
