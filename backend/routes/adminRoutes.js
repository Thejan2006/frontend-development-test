import { Router } from 'express';
import { body, param } from 'express-validator';

import {
  deleteAdminReview,
  getAdminReviews,
  updateReviewStatus
} from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

const router = Router();

router.get('/reviews', protect, adminOnly, getAdminReviews);

router.delete(
  '/reviews/:id',
  protect,
  adminOnly,
  [param('id').isMongoId().withMessage('Invalid review id')],
  validateRequest,
  deleteAdminReview
);

router.patch(
  '/reviews/:id/status',
  protect,
  adminOnly,
  [
    param('id').isMongoId().withMessage('Invalid review id'),
    body('status')
      .isIn(['pending', 'approved', 'hidden'])
      .withMessage('Status must be pending, approved, or hidden')
  ],
  validateRequest,
  updateReviewStatus
);

export default router;
