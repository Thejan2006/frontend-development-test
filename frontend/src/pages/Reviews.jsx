import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../context/AuthContext.jsx';
import { useReviews } from '../context/ReviewContext.jsx';
import RatingSummary from '../components/RatingSummary.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const Reviews = () => {
  const { user, isAuthenticated } = useAuth();
  const { reviews, reviewLoading, reviewError, loadReviews, createReview, updateReview, deleteReview } =
    useReviews();
  const [submitting, setSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    loadReviews().catch(() => undefined);
  }, [loadReviews]);

  const myReview = useMemo(
    () =>
      reviews.find(
        (review) =>
          String(review.userId) === String(user?.id) || String(review.userId) === String(user?._id)
      ) || null,
    [reviews, user]
  );

  useEffect(() => {
    setEditingReview(myReview);
  }, [myReview]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingReview) {
        await updateReview(editingReview.id || editingReview._id, payload);
      } else {
        await createReview(payload);
      }
      setEditingReview(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (review) => {
    const confirmed = window.confirm('Delete this review?');
    if (!confirmed) {
      return;
    }

    setSubmitting(true);
    try {
      await deleteReview(review.id || review._id);
      setEditingReview(null);
    } finally {
      setSubmitting(false);
    }
  };

  const approvedReviews = reviews.filter((review) => review.status === 'approved');
  const visibleReviews = isAuthenticated
    ? reviews
    : approvedReviews;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
            Reviews
          </p>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            Honest feedback, <span className="text-gradient">carefully moderated</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Every customer gets one review, fully protected by authentication and moderation rules.
          </p>
        </div>
        <RatingSummary reviews={approvedReviews} />
      </section>

      {reviewLoading ? <Loading message="Fetching reviews..." /> : null}
      {reviewError ? <ErrorMessage message={reviewError} onRetry={loadReviews} /> : null}

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          {isAuthenticated ? (
            <ReviewForm
              initialValues={
                editingReview
                  ? {
                      rating: editingReview.rating,
                      comment: editingReview.comment
                    }
                  : { rating: 5, comment: '' }
              }
              onSubmit={handleSubmit}
              submitLabel={editingReview ? 'Update Review' : 'Submit Review'}
              isSubmitting={submitting}
              title={editingReview ? 'Update your review' : 'Write your review'}
              note={
                editingReview
                  ? 'Edits will send your review back to pending moderation.'
                  : 'Only one review per user is allowed.'
              }
              onCancel={
                editingReview
                  ? () => setEditingReview(myReview)
                  : undefined
              }
            />
          ) : (
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="font-display text-2xl font-bold text-white">Sign in to review</h2>
              <p className="mt-3 text-slate-300">
                Guests can view approved reviews, but only logged-in users can submit feedback.
              </p>
            </div>
          )}

          {myReview ? (
            <div className="glass-panel rounded-3xl p-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
                Your current review
              </p>
              <div className="mt-4">
                <ReviewCard
                  review={myReview}
                  currentUser={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showStatus
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
                Feedback feed
              </p>
              <h2 className="font-display mt-2 text-2xl font-bold text-white">All visible reviews</h2>
            </div>
            <p className="text-sm text-slate-400">
              {visibleReviews.length} review{visibleReviews.length === 1 ? '' : 's'}
            </p>
          </div>

          {visibleReviews.length ? (
            <div className="grid gap-5">
              {visibleReviews.map((review) => (
                <ReviewCard
                  key={review.id || review._id}
                  review={review}
                  currentUser={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showStatus={isAuthenticated}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-8 text-slate-300">
              No reviews are available yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
