import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../context/AuthContext.jsx';
import { useReviews } from '../context/ReviewContext.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const Profile = () => {
  const { user } = useAuth();
  const { reviews, reviewLoading, reviewError, loadReviews, updateReview, deleteReview } = useReviews();
  const [submitting, setSubmitting] = useState(false);
  const [removing, setRemoving] = useState(false);

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

  const handleSubmit = async (payload) => {
    if (!myReview) {
      return;
    }

    setSubmitting(true);
    try {
      await updateReview(myReview.id || myReview._id, payload);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!myReview) {
      return;
    }

    const confirmed = window.confirm('Delete your review permanently?');
    if (!confirmed) {
      return;
    }

    setRemoving(true);
    try {
      await deleteReview(myReview.id || myReview._id);
    } finally {
      setRemoving(false);
    }
  };

  if (reviewLoading) {
    return <Loading message="Loading your profile..." />;
  }

  if (reviewError) {
    return <ErrorMessage message={reviewError} onRetry={loadReviews} />;
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-3xl p-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">Profile</p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <img
              src={
                user?.profileImage ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=0f172a&textColor=ffffff`
              }
              alt={user?.name}
              className="h-20 w-20 rounded-3xl border border-slate-800 object-cover"
            />
            <div>
              <h1 className="font-display text-3xl font-bold text-white">{user?.name}</h1>
              <p className="mt-1 text-slate-400">{user?.email}</p>
              <p className="mt-2 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 px-5 py-4">
              <p className="text-sm text-slate-400">Review access</p>
              <p className="mt-1 font-display text-xl font-bold text-white">Authenticated</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 px-5 py-4">
              <p className="text-sm text-slate-400">Account type</p>
              <p className="mt-1 font-display text-xl font-bold text-white capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          {myReview ? (
            <div className="space-y-5">
              <ReviewForm
                initialValues={{
                  rating: myReview.rating,
                  comment: myReview.comment
                }}
                onSubmit={handleSubmit}
                submitLabel={submitting ? 'Saving...' : 'Update My Review'}
                isSubmitting={submitting}
                title="Edit your review"
                note="Updating your review sends it back to moderation."
              />
              <button
                type="button"
                onClick={handleDelete}
                disabled={removing}
                className="w-full rounded-full border border-rose-400/40 bg-rose-500/10 px-6 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {removing ? 'Deleting...' : 'Delete My Review'}
              </button>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="font-display text-2xl font-bold text-white">No review yet</h2>
              <p className="mt-3 text-slate-300">
                Your account is ready. Head to the reviews page to submit your first rating.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
              Your review
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-white">Current status</h2>
          </div>

          {myReview ? (
            <ReviewCard review={myReview} currentUser={user} showStatus />
          ) : (
            <div className="glass-panel rounded-3xl p-8 text-slate-300">
              Submit a review to see it here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
