import { FaCalendarDays } from 'react-icons/fa6';
import { formatDate } from '../utils/date.js';
import StarRating from './StarRating.jsx';

const statusStyles = {
  pending: 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/25',
  approved: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/25',
  hidden: 'bg-slate-400/15 text-slate-200 ring-1 ring-slate-400/25'
};

const ReviewCard = ({ review, currentUser, onEdit, onDelete, showStatus = false }) => {
  const author = review.user || {};
  const image =
    author.profileImage ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(review.userName || 'User')}&backgroundColor=0f172a&textColor=ffffff`;
  const isOwner =
    currentUser &&
    (String(review.userId) === String(currentUser.id) || String(review.userId) === String(currentUser._id));

  return (
    <article className="group rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={review.userName}
            className="h-14 w-14 rounded-2xl border border-slate-800 bg-slate-900 object-cover"
          />
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{review.userName}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
              <FaCalendarDays />
              <span>{formatDate(review.updatedAt || review.createdAt)}</span>
            </div>
          </div>
        </div>

        {showStatus ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[review.status] || statusStyles.pending}`}
          >
            {review.status}
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <StarRating value={Number(review.rating)} readOnly />
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">{review.comment}</p>

      {isOwner && (onEdit || onDelete) ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {onEdit ? (
            <button
              type="button"
              onClick={() => onEdit(review)}
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Edit
            </button>
          ) : null}
          {onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(review)}
              className="rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
            >
              Delete
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
};

export default ReviewCard;
