import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendUnauthorizedResponse } from '../utils/responseUtils';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(error: Error, req: Request, res: Response) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  console.info(`ERROR: ${req.path} , message: ${error.message}`);
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  });
}

export function checkRole(role: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = await jwt.verify(token, 'secret');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (decoded.role !== role) {
        return sendUnauthorizedResponse(res, 403);
      }
      next();
    } catch (error) {
      sendUnauthorizedResponse(res);
    }
  };
}
