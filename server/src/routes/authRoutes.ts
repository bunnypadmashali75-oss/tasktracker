import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, getMe } from '../controllers/authController';
import { validateRequest } from '../middleware/validationMiddleware';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post(
  '/register',
  [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),
    body('role').optional().isIn(['user', 'admin']),
  ],
  validateRequest,
  register,
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validateRequest,
  login,
);

router.get('/me', authenticate, getMe);

export default router;
