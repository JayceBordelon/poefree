import { Router } from 'express';
import { getUsers, createUser, deleteAllUsers } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/', deleteAllUsers);

export default router;
