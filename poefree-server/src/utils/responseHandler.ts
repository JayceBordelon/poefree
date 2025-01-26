import { Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export type ResponseData = {
    res: Response;
    statusCode: StatusCodes;
    message?: string;
    payload?: any;
    errorMessage?: string;
};

// Function to handle success responses
export const successResponse = (responseData: ResponseData) => {
    const { res, statusCode, message, payload } = responseData;
    res.status(statusCode).json({
        status: getReasonPhrase(statusCode),
        message,
        payload,
    });
};

// Function to handle error responses
export const errorResponse = (responseData: ResponseData) => {
    const { res, statusCode, errorMessage } = responseData;
    res.status(statusCode).json({
        status: getReasonPhrase(statusCode),
        error: errorMessage,
    });
};
