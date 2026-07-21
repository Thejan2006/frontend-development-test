import { FaRegStar, FaStar } from 'react-icons/fa6';

const StarRating = ({ value = 0, onChange, readOnly = false, size = 'text-xl' }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const active = starValue <= value;

        const icon = active ? (
          <FaStar className="text-amber-400 drop-shadow-sm" />
        ) : (
          <FaRegStar className="text-slate-500" />
        );

        if (readOnly) {
          return (
            <span key={starValue} className={size} aria-hidden="true">
              {icon}
            </span>
          );
        }

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange?.(starValue)}
            className={`${size} rounded-md p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400/70`}
            aria-label={`Set rating to ${starValue}`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
