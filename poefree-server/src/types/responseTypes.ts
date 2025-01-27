import { StatusCodes } from "http-status-codes";
import { Response } from "express";

export type ResponseData = {
  res: Response;
  statusCode: StatusCodes;
  message?: string;
  payload?: any;
  errorMessage?: string;
  causes?: any;
};

export type ServerResponse = Omit<ResponseData, "res">;

export type ServerErrorResponse = Omit<ServerResponse, "message" | "payload">;

export type ServerSuccessResponse = Omit<
  ServerResponse,
  "errorMessage" | "causes"
>;
