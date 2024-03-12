import express, { Request, Response } from 'express';
import MovieRouter from './movie';
import { generateAccessToken } from '../utils/access-token-generator';
import { sendSuccessResponse } from '../utils/responseUtils';

const router = express.Router();

router.use('/movies', MovieRouter);
router.get('/token', async (req: Request, res: Response) => {
  const { role } = req.body;
  const token = generateAccessToken(role);
  sendSuccessResponse(res, { token });
});

export default router;
