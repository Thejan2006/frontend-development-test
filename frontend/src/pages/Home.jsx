import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBolt, FaChartLine, FaLock, FaShieldHalved } from 'react-icons/fa6';

import { useAuth } from '../context/AuthContext.jsx';
import { useReviews } from '../context/ReviewContext.jsx';
import RatingSummary from '../components/RatingSummary.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const { reviews, reviewLoading, reviewError, loadReviews } = useReviews();

  useEffect(() => {
    loadReviews().catch(() => undefined);
  }, [loadReviews]);

  const approvedReviews = reviews.filter((review) => review.status === 'approved').slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
            <FaBolt />
            Production-ready review and rating platform
          </div>
          <h1 className="font-display max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build trust with a{' '}
            <span className="text-gradient">modern review system</span> for your technology brand
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Collect authenticated feedback, moderate reviews with admin controls, and present
            customer sentiment with a polished interface designed for real-world production use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={isAuthenticated ? '/reviews' : '/register'}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              {isAuthenticated ? 'Go to Reviews' : 'Create Account'}
              <FaArrowRight />
            </Link>
            <Link
              to="/reviews"
              className="rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
            >
              Explore Reviews
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Secure Auth', value: 'JWT + bcrypt', icon: FaLock },
              { label: 'Moderation', value: 'Approve / Hide', icon: FaShieldHalved },
              { label: 'Insights', value: 'Rating summary', icon: FaChartLine }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass-panel rounded-3xl p-5">
                  <Icon className="text-2xl text-cyan-300" />
                  <p className="mt-3 text-sm text-slate-400">{item.label}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
              Review momentum
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm text-slate-400">Signed in as</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">
                  {user?.name || 'Guest'}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {isAuthenticated ? user?.email : 'Login to submit a review'}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm text-slate-400">Moderation state</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">Pending</p>
                <p className="mt-1 text-sm text-slate-500">New reviews await approval</p>
              </div>
            </div>
          </div>

          {reviewLoading ? <Loading message="Loading latest reviews..." /> : null}
          {reviewError ? <ErrorMessage message={reviewError} onRetry={loadReviews} /> : null}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
              Community signal
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white">What people are saying</h2>
          </div>
          <Link to="/reviews" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            View all reviews
          </Link>
        </div>

        <RatingSummary reviews={reviews.filter((review) => review.status === 'approved')} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
            Featured testimonials
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white">Latest approved feedback</h2>
        </div>

        {approvedReviews.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {approvedReviews.map((review) => (
              <ReviewCard key={review.id || review._id} review={review} currentUser={user} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 text-center text-slate-300">
            No approved reviews yet. Be the first to leave thoughtful feedback.
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
