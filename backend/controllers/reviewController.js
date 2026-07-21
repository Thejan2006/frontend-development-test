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
        profileImage: review.userId.profileImage,
        role: review.userId.role
      }
    : undefined
});

export const getReviews = asyncHandler(async (req, res) => {
  const isAuthenticated = Boolean(req.user);

  const query = isAuthenticated
    ? {
        $or: [
          { status: 'approved' },
          { userId: req.user._id }
        ]
      }
    : { status: 'approved' };

  const reviews = await Review.find(query)
    .populate('userId', 'name profileImage role')
    .sort({ updatedAt: -1 });

  res.json({
    success: true,
    count: reviews.length,
    reviews: reviews.map(buildReviewResponse)
  });
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const user = req.user;

  const existingReview = await Review.findOne({ userId: user._id });
  if (existingReview) {
    throw new AppError('You can only submit one review', 400);
  }

  const review = await Review.create({
    userId: user._id,
    userName: user.name,
    rating,
    comment,
    status: 'pending'
  });

  const populatedReview = await Review.findById(review._id).populate('userId', 'name profileImage role');

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    review: buildReviewResponse(populatedReview)
  });
});

export const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  if (String(review.userId) !== String(req.user._id)) {
    throw new AppError('You can only edit your own review', 403);
  }

  review.rating = rating;
  review.comment = comment;
  review.status = 'pending';
  review.userName = req.user.name;
  await review.save();

  const populatedReview = await Review.findById(review._id).populate('userId', 'name profileImage role');

  res.json({
    success: true,
    message: 'Review updated successfully',
    review: buildReviewResponse(populatedReview)
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  const isOwner = String(review.userId) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new AppError('You do not have permission to delete this review', 403);
  }

  await review.deleteOne();

  res.json({
    success: true,
    message: 'Review deleted successfully'
  });
});
