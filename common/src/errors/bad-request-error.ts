import { CustomError } from "../models";

export class BadRequestError extends CustomError {
  readonly statusCode = 400;

  constructor(public message: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
