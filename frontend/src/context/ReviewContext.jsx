import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import {
  createReview as createReviewRequest,
  deleteReview as deleteReviewRequest,
  fetchReviews as fetchReviewsRequest,
  updateReview as updateReviewRequest
} from '../api/reviewApi.js';

const ReviewContext = createContext(null);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const loadReviews = useCallback(async () => {
    setReviewLoading(true);
    setReviewError('');

    try {
      const data = await fetchReviewsRequest();
      setReviews(data.reviews || []);
      return data.reviews || [];
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to load reviews';
      setReviewError(message);
      throw error;
    } finally {
      setReviewLoading(false);
    }
  }, []);

  const createReview = useCallback(
    async (payload) => {
      const data = await createReviewRequest(payload);
      toast.success(data.message || 'Review submitted');
      await loadReviews();
      return data.review;
    },
    [loadReviews]
  );

  const updateReview = useCallback(
    async (id, payload) => {
      const data = await updateReviewRequest(id, payload);
      toast.success(data.message || 'Review updated');
      await loadReviews();
      return data.review;
    },
    [loadReviews]
  );

  const deleteReview = useCallback(
    async (id) => {
      const data = await deleteReviewRequest(id);
      toast.success(data.message || 'Review deleted');
      await loadReviews();
      return data;
    },
    [loadReviews]
  );

  const value = useMemo(
    () => ({
      reviews,
      reviewLoading,
      reviewError,
      setReviews,
      loadReviews,
      createReview,
      updateReview,
      deleteReview
    }),
    [reviews, reviewLoading, reviewError, loadReviews, createReview, updateReview, deleteReview]
  );

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
};

export const useReviews = () => {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error('useReviews must be used inside ReviewProvider');
  }

  return context;
};
