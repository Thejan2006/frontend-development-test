import Review from '../models/Review.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';

const buildReviewResponse = (review) => ({
  id: review._id,
  userId: review.userId?._id || review.userId,
  userName: review.userName,
  rating: review.rating,
  comment: review.comment,
  status: review.status,
  createdAt: review.createdAt,
  updatedAt: review.updatedAt,
  user: review.userId
    ? {
        id: review.userId._id,
        name: review.userId.name,
        email: review.userId.email,
        profileImage: review.userId.profileImage,
        role: review.userId.role
      }
    : undefined
});

export const getAdminReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate('userId', 'name email profileImage role')
    .sort({ updatedAt: -1 });

  res.json({
    success: true,
    count: reviews.length,
    reviews: reviews.map(buildReviewResponse)
  });
});

export const deleteAdminReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  await review.deleteOne();

  res.json({
    success: true,
    message: 'Review removed by admin'
  });
});

export const updateReviewStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  review.status = status;
  await review.save();

  const populatedReview = await Review.findById(review._id).populate('userId', 'name email profileImage role');

  res.json({
    success: true,
    message: `Review marked as ${status}`,
    review: buildReviewResponse(populatedReview)
  });
});
