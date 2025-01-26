import { Request, Response } from 'express';
import prisma from '../config/db';
import { successResponse, errorResponse } from '../utils/responseHandler';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { CreateUserPayload } from '../types/payloads/userPayloads';

/**
 * Fetches all users from the database.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 *
 * @returns A JSON array of user objects if successful, excluding sensitive fields like passwords.
 *
 * @throws {500} Internal Server Error - If there is a problem accessing the database.
 * @throws {404} Not Found - If no users are found.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!users.length) {
            return errorResponse({
                res,
                statusCode: StatusCodes.NOT_FOUND,
                errorMessage: 'No users found',
            });
        }

        successResponse({
            res,
            statusCode: StatusCodes.OK,
            message: 'Users fetched successfully',
            payload: users,
        });
    } catch (error) {
        errorResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            errorMessage: 'Failed to fetch users',
        });
    }
};

/**
 * Creates a new user in the database with a hashed password.
 *
 * @param req - The HTTP request object. Expects a JSON body with `name`, `email`, and `password` fields.
 * @param res - The HTTP response object.
 *
 * @returns A JSON object representing the newly created user if successful, or an error message if the creation fails.
 *
 * @example
 * // Request body:
 * // {
 * //   "name": "John Doe",
 * //   "email": "john.doe@example.com",
 * //   "password": "mypassword123"
 * // }
 *
 * @throws {400} Bad Request - If `name`, `email`, or `password` is missing in the request body.
 * @throws {409} Conflict - If the email already exists in the database.
 * @throws {500} Internal Server Error - If there is a problem accessing the database.
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as CreateUserPayload;

        if (!name || !email || !password) {
            return errorResponse({
                res,
                statusCode: StatusCodes.BAD_REQUEST,
                errorMessage: 'Name, email, and password are required',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        const { password: _, ...userWithoutPassword } = newUser;

        successResponse({
            res,
            statusCode: StatusCodes.CREATED,
            message: 'User created successfully',
            payload: userWithoutPassword,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Unique constraint failed')
        ) {
            return errorResponse({
                res,
                statusCode: StatusCodes.CONFLICT,
                errorMessage: 'Email already exists',
            });
        }
        errorResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            errorMessage: 'Failed to create user',
        });
    }
};
