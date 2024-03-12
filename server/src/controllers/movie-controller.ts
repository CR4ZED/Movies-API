import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';
import MovieService from '../services/movie-service';

export default class MovieController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, genre, rating, streamingLink } = req.body;
      const movie = await MovieService.create({
        title,
        genre,
        rating,
        streamingLink
      });
      sendSuccessResponse(res, movie, 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, genre, rating, streamingLink } = req.body;
    try {
      const movie = await MovieService.update(id, {
        title,
        genre,
        rating,
        streamingLink
      });
      sendSuccessResponse(res, movie);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const movie = await MovieService.delete(id);
      sendSuccessResponse(res, movie);
    } catch (error) {
      next(error);
    }
  }

  static async getMovie(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const movie = await MovieService.findOne(id);
      sendSuccessResponse(res, movie);
    } catch (error) {
      next(error);
    }
  }

  static async listMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await MovieService.findAll();
      sendSuccessResponse(res, movies);
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    const encodedQuery = req.query?.q as string;
    if (!encodedQuery) {
      sendErrorResponse(res, 400, 'Missing query parameter');
      return;
    }
    const query = decodeURIComponent(encodedQuery);
    const [property, value] = query.split('=');
    try {
      const entity = await MovieService.search(property, value);
      sendSuccessResponse(res, entity);
    } catch (error) {
      next(error);
    }
  }
}
