const RatingSummary = ({ reviews = [] }) => {
  const total = reviews.length;
  const average = total
    ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / total
    : 0;

  const counts = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => Number(review.rating) === rating).length;
    return { rating, count };
  });

  return (
    <section className="glass-panel rounded-3xl p-6">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
            Rating Summary
          </p>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-display text-5xl font-bold text-white">
              {average.toFixed(1)}
            </span>
            <span className="pb-1 text-sm text-slate-400">/ 5.0</span>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Based on {total} review{total === 1 ? '' : 's'}
          </p>
        </div>

        <div className="space-y-3">
          {counts.map(({ rating, count }) => {
            const width = total ? `${(count / total) * 100}%` : '0%';
            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="w-8 text-sm font-semibold text-slate-300">{rating}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width }}
                  />
                </div>
                <span className="w-8 text-right text-sm text-slate-400">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RatingSummary;
