import { getReasonPhrase } from 'http-status-codes';
import { ResponseData } from '../types/responseTypes';

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
