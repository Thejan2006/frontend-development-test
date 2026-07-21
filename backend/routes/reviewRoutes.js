import { Router } from 'express';
import { body, param } from 'express-validator';

import {
  createReview,
  deleteReview,
  getReviews,
  updateReview
} from '../controllers/reviewController.js';
import { optionalAuth, protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

const router = Router();

router.get('/', optionalAuth, getReviews);

router.post(
  '/',
  protect,
  [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('comment')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Comment must be between 10 and 1000 characters')
  ],
  validateRequest,
  createReview
);

router.put(
  '/:id',
  protect,
  [
    param('id').isMongoId().withMessage('Invalid review id'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('comment')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Comment must be between 10 and 1000 characters')
  ],
  validateRequest,
  updateReview
);

router.delete(
  '/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid review id')],
  validateRequest,
  deleteReview
);

export default router;
