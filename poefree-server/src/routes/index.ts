import { Router } from 'express';
import userRoutes from './userRoutes';
import poemRoutes from './poemRoutes';
import { successResponse } from '../utils/responseHandler';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.use('/users', userRoutes);
router.use('/poems', poemRoutes);

export default router;
