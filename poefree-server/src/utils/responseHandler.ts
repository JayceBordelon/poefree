import { getReasonPhrase } from 'http-status-codes';
import { ResponseData, ServerResponse } from '../types/responseTypes';
// Function to handle success responses
export const successResponse = (responseData: ResponseData) => {
    const { res, statusCode, message, payload } = responseData;
    const formalResponse: ServerResponse = {
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
    const formalResponse: ServerResponse = {
        statusCode: statusCode,
        errorMessage,
    };
    console.error(formalResponse);
    res.status(statusCode).json(formalResponse);
};
