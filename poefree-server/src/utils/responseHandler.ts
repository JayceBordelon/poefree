import {
  ResponseData,
  ServerErrorResponse,
  ServerSuccessResponse,
} from "../types/responseTypes";

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

export const errorResponse = (responseData: ResponseData) => {
  const { res, statusCode, errorMessage, causes } = responseData;
  const formalResponse: ServerErrorResponse = {
    statusCode: statusCode,
    errorMessage,
    causes,
  };
  console.error(formalResponse);
  res.status(statusCode).json(formalResponse);
};
