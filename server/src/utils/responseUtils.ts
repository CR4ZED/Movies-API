import { Response } from 'express';

// Function to send a JSON response
export const sendJsonResponse = (
  res: Response,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
) => {
  res.status(statusCode).json(data);
};

// Function to send an error response
export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  errorMessage: string
) => {
  res.status(statusCode).json({ error: errorMessage });
};

// Function to send a success response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendSuccessResponse = (
  res: Response,
  data?: unknown,
  status: number = 200
) => {
  sendJsonResponse(res, status, { success: true, data });
};

// Function to send a not found response
export const sendNotFoundResponse = (res: Response, resourceName: string) => {
  sendErrorResponse(res, 404, `${resourceName} not found`);
};

export const sendUnauthorizedResponse = (
  res: Response,
  statusCode: number = 401
) => {
  sendErrorResponse(res, statusCode, 'Unauthorized');
};
