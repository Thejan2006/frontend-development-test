const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-800/70 bg-slate-950/60 px-6 py-12 text-slate-300 shadow-2xl shadow-slate-950/40">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
        <p className="text-sm font-medium tracking-wide">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
