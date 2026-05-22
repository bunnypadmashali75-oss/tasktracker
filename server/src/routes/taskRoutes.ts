import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { authenticate } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validationMiddleware';
import { createNewTask, removeTask, getAllTasks, getTask, updateExistingTask } from '../controllers/taskController';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 }),
    query('status').optional().isString(),
    query('priority').optional().isString(),
    query('search').optional().isString(),
  ],
  validateRequest,
  getAllTasks,
);

router.post(
  '/',
  [
    body('title').isString().trim().notEmpty(),
    body('description').optional().isString(),
    body('status').optional().isIn(['Todo', 'In Progress', 'Completed']),
    body('priority').optional().isIn(['Low', 'Medium', 'High']),
    body('dueDate').optional().isISO8601(),
    body('tags').optional().isArray(),
  ],
  validateRequest,
  createNewTask,
);

router.get('/:id', [param('id').isMongoId()], validateRequest, getTask);
router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('title').optional().isString().trim().notEmpty(),
    body('description').optional().isString(),
    body('status').optional().isIn(['Todo', 'In Progress', 'Completed']),
    body('priority').optional().isIn(['Low', 'Medium', 'High']),
    body('dueDate').optional().isISO8601(),
    body('tags').optional().isArray(),
  ],
  validateRequest,
  updateExistingTask,
);
router.delete('/:id', [param('id').isMongoId()], validateRequest, removeTask);

export default router;
