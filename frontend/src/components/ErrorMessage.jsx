const ErrorMessage = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-6 py-5 text-rose-100 shadow-lg shadow-rose-950/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">We hit a snag</p>
          <p className="mt-1 text-sm text-rose-100/80">{message}</p>
        </div>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center rounded-full bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300"
          >
            Try again
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorMessage;
