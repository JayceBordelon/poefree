import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

export type ResponseData = {
    res: Response;
    statusCode: StatusCodes;
    message?: string;
    payload?: any;
    errorMessage?: string;
};
