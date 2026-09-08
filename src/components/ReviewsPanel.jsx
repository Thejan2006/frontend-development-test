import { useCallback, useEffect, useState } from "react";
import { Check, Edit3, MessageCircle, Send, ShieldCheck, Star, Trash2, UserRound, X } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../utils/api";

function StarRating({ value, onChange, readOnly = false, size = 18 }) {
    return <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" disabled={readOnly} onClick={() => onChange?.(star)} className={`${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition`}><Star size={size} fill={star <= value ? "currentColor" : "none"} className={star <= value ? "text-amber-400" : "text-slate-200"} /></button>)}</div>;
}

export default function ReviewsPanel({ productId }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editRating, setEditRating] = useState(5);
    const [editComment, setEditComment] = useState("");
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsError, setReviewsError] = useState("");
    const [showForm, setShowForm] = useState(false);

    const getUserIdFromToken = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`).join(""));
            const payload = JSON.parse(jsonPayload);
            return payload.id || payload.userId;
        } catch {
            return null;
        }
    };

    const fetchReviews = useCallback(async () => {
        if (!productId) return;
        setReviewsLoading(true);
        setReviewsError("");
        try {
            const res = await api.get(`/reviews?productId=${productId}`);
            const allReviews = res.data.data?.reviews || res.data;
            setReviews(Array.isArray(allReviews) ? allReviews : []);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviewsError(error?.response?.data?.message || "Reviews could not be loaded right now.");
        } finally {
            setReviewsLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setCurrentUserId(getUserIdFromToken(token));
        }
        fetchReviews();
    }, [productId, fetchReviews]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) return;
        try {
            const token = localStorage.getItem("token");
            await api.post("/reviews", { productId, rating, comment: reviewText }, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Review submitted successfully! Pending approval.");
            setReviewText("");
            setRating(5);
            setShowForm(false);
            fetchReviews();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit review");
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Review deleted successfully");
            fetchReviews();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete review");
        }
    };

    const startEditing = (rev) => {
        setEditingReviewId(rev.id || rev._id);
        setEditRating(rev.rating);
        setEditComment(rev.comment);
    };

    const handleUpdate = async (reviewId) => {
        if (!editComment.trim()) return;
        try {
            const token = localStorage.getItem("token");
            await api.put(`/reviews/${reviewId}`, { rating: editRating, comment: editComment }, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Review updated successfully");
            setEditingReviewId(null);
            fetchReviews();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update review");
        }
    };

    const average = reviews.length ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1) : "0.0";

    return <section className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 p-6 text-white sm:p-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-100"><MessageCircle size={15} /> Community feedback</div><h2 className="text-2xl font-black sm:text-3xl">Reviews from the build community</h2><p className="mt-2 max-w-xl text-sm text-blue-100">Real experiences from customers who upgraded their setup with Isuru Computers.</p></div><div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"><div><p className="text-4xl font-black">{average}</p><StarRating value={Math.round(Number(average))} readOnly size={15} /></div><div className="border-l border-white/20 pl-4 text-xs text-blue-100"><p className="font-bold text-white">{reviews.length} reviews</p><p className="mt-1">Verified feedback</p></div></div></div></div>

        <div className="p-5 sm:p-8"><div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:flex-row sm:items-center"><div><p className="flex items-center gap-2 text-sm font-bold text-slate-900"><ShieldCheck size={17} className="text-blue-600" /> Share your experience</p><p className="mt-1 text-xs text-slate-500">Your review helps the next builder choose with confidence.</p></div>{isLoggedIn ? <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">{showForm ? <X size={16} /> : <Send size={16} />} {showForm ? "Close form" : "Write a review"}</button> : <Link to="/signin" className="rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-slate-800">Log in to review</Link>}</div>

            {isLoggedIn && showForm && <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"><div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h3 className="font-bold text-slate-900">What did you think?</h3><p className="mt-1 text-xs text-slate-500">Rate the product and tell other builders what stood out.</p></div><div className="flex items-center gap-3"><span className="text-xs font-bold text-slate-500">Your rating</span><StarRating value={rating} onChange={setRating} size={22} /></div></div><textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Share details about performance, quality, delivery, or setup experience..." rows="4" required /><div className="mt-4 flex justify-end"><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"><Send size={15} /> Post review</button></div></form>}

            {reviewsLoading && <div className="grid gap-4 md:grid-cols-2"><div className="h-36 animate-pulse rounded-2xl bg-slate-100" /><div className="h-36 animate-pulse rounded-2xl bg-slate-100" /></div>}
            {!reviewsLoading && reviewsError && <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p className="font-bold">{reviewsError}</p><button onClick={fetchReviews} className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white">Try again</button></div>}
            {!reviewsLoading && !reviewsError && reviews.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm"><MessageCircle size={22} /></div><p className="mt-4 font-bold text-slate-800">No reviews yet</p><p className="mt-1 text-sm text-slate-500">Be the first customer to share a build note.</p></div>}
            {!reviewsLoading && !reviewsError && reviews.length > 0 && <div className="grid gap-4 md:grid-cols-2">{reviews.map((rev) => { const reviewId = rev.id || rev._id; const isMyReview = currentUserId && String(rev.userId) === String(currentUserId); const isEditing = editingReviewId === reviewId; return <article key={reviewId} className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><UserRound size={18} /></div><div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-slate-900">{rev.userName || "Anonymous User"}</p><span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600"><Check size={12} /> Verified</span></div><p className="mt-1 text-xs text-slate-400">Customer review</p></div></div><StarRating value={isEditing ? editRating : rev.rating} readOnly size={15} /></div>{isEditing ? <div className="mt-5 space-y-3"><div className="flex items-center gap-3"><span className="text-xs font-bold text-slate-500">Rating</span><StarRating value={editRating} onChange={setEditRating} size={20} /></div><textarea value={editComment} onChange={(e) => setEditComment(e.target.value)} className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" rows="3" /><div className="flex justify-end gap-2"><button type="button" onClick={() => setEditingReviewId(null)} className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100">Cancel</button><button type="button" onClick={() => handleUpdate(reviewId)} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white">Save</button></div></div> : <p className="mt-5 text-sm leading-7 text-slate-600">“{rev.comment}”</p>}{isMyReview && !isEditing && <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => startEditing(rev)} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50"><Edit3 size={13} /> Edit</button><button type="button" onClick={() => handleDelete(reviewId)} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-red-500 hover:bg-red-50"><Trash2 size={13} /> Delete</button></div>}</article>; })}</div>}
        </div>
    </section>;
}
