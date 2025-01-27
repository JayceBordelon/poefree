import { Request, Response, NextFunction } from "express";
import { validationResult, check } from "express-validator";
import { errorResponse } from "../utils/responseHandler";
import { StatusCodes } from "http-status-codes";
import { ServerErrorResponse } from "../types/responseTypes";

export const validateAndSanitize = [
  (req: Request, res: Response, next: NextFunction): void => {
    const validators = [];

    if (req.body.email !== undefined) {
      validators.push(
        check("email")
          .trim()
          .isEmail()
          .withMessage("Invalid email format")
          .normalizeEmail(),
      );
    }

    if (req.body.password !== undefined) {
      validators.push(
        check("password")
          .trim()
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters long"),
      );
    }

    if (req.body.name !== undefined) {
      validators.push(
        check("name")
          .trim()
          .escape()
          .isString()
          .withMessage("Name must be a valid string"),
      );
    }

    Promise.all(validators.map((validator) => validator.run(req))).then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const validationErrorResponse = {
          res,
          statusCode: StatusCodes.BAD_REQUEST,
          errorMessage: "Validation failed",
          causes: errors.array(),
        };
        return errorResponse(validationErrorResponse);
      }
      next();
    });
  },
];
