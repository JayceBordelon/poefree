import {
  ResponseData,
  ServerErrorResponse,
  ServerSuccessResponse,
} from "../types/responseTypes";

// Function to handle success responses
export const successResponse = (responseData: ResponseData) => {
  const { res, statusCode, message, payload } = responseData;
  const formalResponse: ServerSuccessResponse = {
    statusCode: statusCode,
    message,
    payload,
  };
  console.info(formalResponse);
  res.status(statusCode).json(formalResponse);
};

// Function to handle error responses
export const errorResponse = (responseData: ResponseData) => {
  const { res, statusCode, errorMessage } = responseData;
  const formalResponse: ServerErrorResponse = {
    statusCode: statusCode,
    errorMessage,
  };
  console.error(formalResponse);
  res.status(statusCode).json(formalResponse);
};
