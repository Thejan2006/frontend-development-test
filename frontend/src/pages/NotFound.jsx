import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">404</p>
      <h1 className="font-display mt-4 text-4xl font-extrabold text-white sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-300">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
