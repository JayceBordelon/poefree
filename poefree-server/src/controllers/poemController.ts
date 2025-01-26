import { Request, Response } from "express";
import prisma from "../config/db";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { StatusCodes } from "http-status-codes";

/**
 * Creates a new poem in the database.
 *
 * @param req - The HTTP request object. Expects a JSON body with `title`, `content`, `creatorId`, and optional `published`.
 * @param res - The HTTP response object.
 *
 * @returns The newly created poem if successful, or an error message if the creation fails.
 *
 * @example
 * // Request body:
 * {
 *   "title": "My First Poem",
 *   "content": "<p>This is my poem content</p>",
 *   "creatorId": 1,
 *   "published": true
 * }
 */
export const createPoem = async (req: Request, res: Response) => {
  try {
    const { title, content, creatorId, published = false } = req.body;

    if (!title || !content || !creatorId) {
      return errorResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        errorMessage: "Title, content, and creatorId are required",
      });
    }

    const newPoem = await prisma.poem.create({
      data: {
        title,
        content,
        published,
        creatorId,
      },
    });

    successResponse({
      res,
      statusCode: StatusCodes.CREATED,
      message: "Poem created successfully",
      payload: newPoem,
    });
  } catch (error) {
    console.error("Error creating poem:", error);
    errorResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage: "Failed to create poem",
    });
  }
};

/**
 * Deletes a poem by its ID.
 *
 * @param req - The HTTP request object. Expects `id` as a route parameter.
 * @param res - The HTTP response object.
 *
 * @returns A success message if the poem is deleted, or an error message if the deletion fails.
 *
 * @example
 * // Route: DELETE /api/poems/:id
 */
export const deletePoem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        errorMessage: "Poem ID is required",
      });
    }

    const poem = await prisma.poem.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!poem) {
      return errorResponse({
        res,
        statusCode: StatusCodes.NOT_FOUND,
        errorMessage: "Poem not found",
      });
    }

    await prisma.poem.delete({
      where: { id: parseInt(id, 10) },
    });

    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "Poem deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting poem:", error);
    errorResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage: "Failed to delete poem",
    });
  }
};
