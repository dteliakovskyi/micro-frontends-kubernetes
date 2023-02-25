import { ValidationError } from "express-validator";
import { CustomError } from "../models";

export class RequestValidationError extends CustomError {
  readonly statusCode = 422;

  constructor(private errors: ValidationError[]) {
    super("Invalid request parameters");
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: String(err.msg), field: err.param };
    });
  }
}
