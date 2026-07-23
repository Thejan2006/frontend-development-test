import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import api from '../utils/api';

export default function ReviewsPanel({ productId }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5); 
    const [reviews, setReviews] = useState([]);

    // Edit කිරීම සඳහා අවශ්‍ය States
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editRating, setEditRating] = useState(5);
    const [editComment, setEditComment] = useState("");

    // JWT Token එකෙන් User ID එක ලබාගැනීමට 
    const getUserIdFromToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload).id || JSON.parse(jsonPayload).userId;
        } catch (e) {
            return null;
        }
    };

    const fetchReviews = async () => {
        if (!productId) return;
        try {
            const res = await api.get(`/reviews?productId=${productId}`);
            const allReviews = res.data.data?.reviews || res.data;
            setReviews(Array.isArray(allReviews) ? allReviews : []);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const userId = getUserIdFromToken(token);
            setCurrentUserId(userId);
        }
        fetchReviews();
    }, [productId]);

    // Review එකක් දැමීම (Create)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) return;
        
        try {
            const token = localStorage.getItem("token");
            await api.post("/reviews", {
                productId: productId,
                rating: rating,
                comment: reviewText
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Review submitted successfully! Pending approval.");
            setReviewText("");
            setRating(5);
            fetchReviews();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit review");
        }
    };

    
    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            const token = localStorage.getItem("token");
            await api.delete(`/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
            await api.put(`/reviews/${reviewId}`, {
                rating: editRating,
                comment: editComment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Review updated successfully");
            setEditingReviewId(null);
            fetchReviews();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update review");
        }
    };

    return (
        <div className="w-full mt-10 p-6 bg-white/5 border border-slate-200 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-text-main">Product Reviews</h2>
            
            
            {isLoggedIn ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white text-slate-800 border border-slate-300"
                    >
                        <option value={5}>5 Stars - Excellent</option>
                        <option value={4}>4 Stars - Good</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Poor</option>
                        <option value={1}>1 Stars - Terrible</option>
                    </select>

                    <textarea 
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white text-slate-800 border border-slate-300 focus:outline-none focus:border-accent"
                        placeholder="Write your review here..."
                        rows="3"
                        required
                    />
                    <button type="submit" className="self-end px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all">
                        Post Review
                    </button>
                </form>
            ) : (
                <div className="p-4 bg-slate-100 border border-slate-200 rounded-lg text-center flex flex-col items-center justify-center mb-8">
                    <p className="text-slate-500 font-medium">You need to log in to leave a review.</p>
                    <Link to="/signin" className="inline-block mt-2 px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors">
                        Log In to Review
                    </Link>
                </div>
            )}

            
            <div className="flex flex-col gap-4">
                {reviews.length === 0 ? (
                    <p className="text-slate-500 text-center py-4 bg-slate-50 rounded-lg">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((rev) => {
                        const isMyReview = currentUserId && rev.userId === currentUserId;
                        const isEditing = editingReviewId === (rev.id || rev._id);

                        return (
                            <div key={rev.id || rev._id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <p className="font-bold text-slate-800">{rev.userName || "Anonymous User"}</p>
                                    
                                    <div className="flex items-center gap-3">
                                        {/* Rating Stars */}
                                        <div className="flex text-amber-400 text-sm">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <FaStar key={star} className={star <= (isEditing ? editRating : rev.rating) ? "text-amber-400" : "text-slate-200"} />
                                            ))}
                                        </div>

                                        {/* 🟢 තමන්ගේ Review එක නම් පමණක් Edit & Delete බටන්ස් පෙන්වීම */}
                                        {isMyReview && !isEditing && (
                                            <div className="flex items-center gap-2 ml-2 border-l pl-3 border-slate-200">
                                                <button onClick={() => startEditing(rev)} className="text-blue-500 hover:text-blue-700 text-sm" title="Edit Review">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => handleDelete(rev.id || rev._id)} className="text-red-500 hover:text-red-700 text-sm" title="Delete Review">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                               
                                {isEditing ? (
                                    <div className="flex flex-col gap-2 mt-2">
                                        <select 
                                            value={editRating} 
                                            onChange={(e) => setEditRating(Number(e.target.value))}
                                            className="w-full p-2 rounded-lg bg-white text-slate-800 border border-slate-300 text-sm"
                                        >
                                            <option value={5}>5 Stars</option>
                                            <option value={4}>4 Stars</option>
                                            <option value={3}>3 Stars</option>
                                            <option value={2}>2 Stars</option>
                                            <option value={1}>1 Star</option>
                                        </select>
                                        <textarea 
                                            value={editComment}
                                            onChange={(e) => setEditComment(e.target.value)}
                                            className="w-full p-2 text-sm rounded-lg bg-white text-slate-800 border border-slate-300"
                                            rows="2"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setEditingReviewId(null)} className="px-3 py-1 bg-slate-300 text-slate-700 rounded text-xs font-semibold">
                                                Cancel
                                            </button>
                                            <button onClick={() => handleUpdate(rev.id || rev._id)} className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-semibold">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-600 leading-relaxed">{rev.comment}</p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}