import { Request, Response } from "express";
import prisma from "../config/db";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import { CreateUserPayload } from "../types/payloads/authPaylods";
import { generateToken } from "../utils/auth";
import { User } from "@prisma/client";

/**
 * Logs in a user by validating their credentials.
 *
 * @param req - The HTTP request object. Expects a JSON body with `email` and `password` fields.
 * @param res - The HTTP response object.
 *
 * @returns A JSON object containing the user object (excluding the password) if successful.
 *
 * @example
 *  Request body:
 *  {
 *    "email": "john.doe@example.com",
 *    "password": "mypassword123"
 *  }
 *
 * @throws {400} Bad Request - If `email` or `password` is missing in the request body.
 * @throws {404} Not Found - If the user is not found.
 * @throws {401} Unauthorized - If the password does not match the stored hash.
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        errorMessage: "Email and password are required",
      });
    }

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse({
        res,
        statusCode: StatusCodes.NOT_FOUND,
        errorMessage: "User not found",
      });
    }

    const isPasswordValid: boolean = await bcryptjs.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return errorResponse({
        res,
        statusCode: StatusCodes.UNAUTHORIZED,
        errorMessage: "Invalid credentials",
      });
    }
    const token: string = generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;

    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "Login successful",
      payload: { user: userWithoutPassword, token },
    });
  } catch (error) {
    errorResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage: "Failed to log in",
    });
  }
};

/**
 * Creates a new user in the database with a hashed password.
 *
 * @param req - The HTTP request object. Expects a JSON body with `name`, `email`, and `password` fields.
 * @param res - The HTTP response object.
 *
 * @returns A JSON object representing the newly created user if successful, excluding the password.
 *
 * @example
 *  Request body:
 *  {
 *    "name": "John Doe",
 *    "email": "john.doe@example.com",
 *    "password": "mypassword123"
 *  }
 *
 * @throws {400} Bad Request - If `name`, `email`, or `password` is missing in the request body.
 * @throws {409} Conflict - If the email already exists in the database.
 * @throws {500} Internal Server Error - If there is a problem accessing the database.
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as CreateUserPayload;

    if (!email || !password) {
      return errorResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        errorMessage: "Email, and password are required",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    successResponse({
      res,
      statusCode: StatusCodes.CREATED,
      message: "User created successfully",
      payload: userWithoutPassword,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return errorResponse({
        res,
        statusCode: StatusCodes.CONFLICT,
        errorMessage: "Email already exists",
        causes: error.message,
      });
    }
    errorResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage: "Failed to create user",
    });
  }
};
