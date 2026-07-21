import { useEffect, useState } from 'react';
import StarRating from './StarRating.jsx';

const ReviewForm = ({
  initialValues = { rating: 5, comment: '' },
  onSubmit,
  submitLabel = 'Submit Review',
  onCancel,
  isSubmitting = false,
  title = 'Share your experience',
  note = 'Your review will be reviewed before it appears publicly.'
}) => {
  const [rating, setRating] = useState(initialValues.rating || 5);
  const [comment, setComment] = useState(initialValues.comment || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setRating(initialValues.rating || 5);
    setComment(initialValues.comment || '');
  }, [initialValues.rating, initialValues.comment]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating < 1 || rating > 5) {
      setError('Please choose a rating between 1 and 5');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Please enter at least 10 characters');
      return;
    }

    setError('');
    await onSubmit({ rating, comment: comment.trim() });
  };

  return (
    <section className="glass-panel rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
            Review Form
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold text-white">{title}</h2>
          <p className="mt-2 text-sm text-slate-400">{note}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">Your Rating</label>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
            <StarRating value={rating} onChange={setRating} />
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="mb-3 block text-sm font-medium text-slate-300">
            Comment
          </label>
          <textarea
            id="comment"
            rows="6"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write a detailed review about your experience..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        {error ? (
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : submitLabel}
          </button>
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
};

export default ReviewForm;
