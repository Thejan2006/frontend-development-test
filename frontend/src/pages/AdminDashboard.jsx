import { useEffect, useMemo, useState } from 'react';

import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import StarRating from '../components/StarRating.jsx';
import { deleteAdminReview, fetchAdminReviews, updateAdminReviewStatus } from '../api/adminApi.js';
import { formatDate } from '../utils/date.js';

const AdminDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAdminReviews = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchAdminReviews();
      setReviews(data.reviews || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load admin reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminReviews();
  }, []);

  const stats = useMemo(() => {
    return {
      total: reviews.length,
      approved: reviews.filter((review) => review.status === 'approved').length,
      pending: reviews.filter((review) => review.status === 'pending').length,
      hidden: reviews.filter((review) => review.status === 'hidden').length
    };
  }, [reviews]);

  const handleStatusChange = async (review, status) => {
    await updateAdminReviewStatus(review.id || review._id, status);
    await loadAdminReviews();
  };

  const handleDelete = async (review) => {
    const confirmed = window.confirm('Delete this review from the system?');
    if (!confirmed) {
      return;
    }

    await deleteAdminReview(review.id || review._id);
    await loadAdminReviews();
  };

  if (loading) {
    return <Loading message="Loading moderation dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadAdminReviews} />;
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
          Admin Dashboard
        </p>
        <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Moderate reviews with confidence
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-300">
          Approve, hide, or delete user reviews from a single operational view.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total', value: stats.total },
          { label: 'Approved', value: stats.approved },
          { label: 'Pending', value: stats.pending },
          { label: 'Hidden', value: stats.hidden }
        ].map((item) => (
          <div key={item.label} className="glass-panel rounded-3xl p-6">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="font-display mt-2 text-4xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
              Moderation queue
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-white">All reviews</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/70">
          <div className="hidden grid-cols-[1.4fr_0.6fr_0.8fr_1fr_1fr] gap-4 border-b border-slate-800/80 px-6 py-4 text-sm font-medium text-slate-400 md:grid">
            <span>Reviewer</span>
            <span>Rating</span>
            <span>Status</span>
            <span>Created</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {reviews.map((review) => (
              <div
                key={review.id || review._id}
                className="grid gap-4 px-6 py-5 md:grid-cols-[1.4fr_0.6fr_0.8fr_1fr_1fr] md:items-center"
              >
                <div>
                  <p className="font-semibold text-white">{review.userName}</p>
                  <p className="text-sm text-slate-400">{review.user?.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating value={Number(review.rating)} readOnly />
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      review.status === 'approved'
                        ? 'bg-emerald-400/15 text-emerald-200'
                        : review.status === 'pending'
                          ? 'bg-amber-400/15 text-amber-200'
                          : 'bg-slate-400/15 text-slate-200'
                    }`}
                  >
                    {review.status}
                  </span>
                </div>

                <div className="text-sm text-slate-300">{formatDate(review.createdAt)}</div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(review, 'approved')}
                    className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(review, 'hidden')}
                    className="rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700"
                  >
                    Hide
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(review)}
                    className="rounded-full bg-rose-500/15 px-4 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/25"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
