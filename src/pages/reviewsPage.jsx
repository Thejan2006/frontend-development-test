import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { FiPlusCircle, FiThumbsUp } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../utils/api";

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Kasun Fernando",
    product: "Intel Core i7 12th Gen Processor",
    rating: 5,
    date: "2026-07-15",
    comment: "Superb performance! Bought from Isuri Computers Colombo branch. Delivery was quick within 24 hours. Highly recommended seller in Sri Lanka!",
    verified: true,
    likes: 18
  },
  {
    id: 2,
    name: "Dinuka Perera",
    product: "NVIDIA GeForce RTX 4060 8GB",
    rating: 5,
    date: "2026-07-10",
    comment: "Genuine product with 3 years agent warranty. Games running smoothly at 1080p Ultra. Thanks for the quick WhatsApp support!",
    verified: true,
    likes: 12
  },
  {
    id: 3,
    name: "Sahan Jayasinghe",
    product: "Corsair Vengeance LPX 16GB DDR4 RAM",
    rating: 4,
    date: "2026-06-28",
    comment: "Good RAM, plug and play XMP profile worked instantly at 3200MHz. Packaging was very secure.",
    verified: true,
    likes: 7
  },
  {
    id: 4,
    name: "Malith Silva",
    product: "Samsung 980 500GB NVMe SSD",
    rating: 5,
    date: "2026-06-20",
    comment: "Blazing fast read/write speeds. Windows boot time dropped to 5 seconds. Best price in Sri Lanka compared to other stores!",
    verified: true,
    likes: 24
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("isuri_reviews");
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [productsList, setProductsList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get("/products")
      .then(res => setProductsList(res.data || []))
      .catch(err => console.log("Could not load products list for reviews", err));
  }, []);

  function handleAddReview(e) {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || !selectedProduct) {
      toast.error("Please fill in your name, select a product, and write a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      product: selectedProduct,
      rating: rating,
      date: new Date().toISOString().split("T")[0],
      comment: comment.trim(),
      verified: true,
      likes: 0
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("isuri_reviews", JSON.stringify(updated));

    toast.success("Thank you! Your review has been published.");
    setName("");
    setSelectedProduct("");
    setComment("");
    setRating(5);
    setShowModal(false);
  }

  function handleLike(id) {
    const updated = reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r);
    setReviews(updated);
    localStorage.setItem("isuri_reviews", JSON.stringify(updated));
    toast.success("Thank you for your feedback!");
  }

  // Calculate Average Rating
  const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <span className="text-purple-600 font-bold uppercase tracking-widest text-xs bg-purple-100 px-3 py-1 rounded-full">
          Customer Satisfaction
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-3">
          Product Reviews & Testimonials
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Read genuine reviews from verified buyers across Sri Lanka who trust <strong className="text-purple-600">ISURI COMPUTERS</strong> for authentic PC parts & laptops.
        </p>
      </div>

      {/* Summary Section */}
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-6xl font-black text-slate-900">{avgRating}</span>
            <div className="flex text-amber-400 text-xl justify-center md:justify-start my-1">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar key={star} className={star <= Math.round(Number(avgRating)) ? "text-amber-400" : "text-slate-200"} />
              ))}
            </div>
            <p className="text-slate-500 text-sm font-medium">Based on {reviews.length} customer reviews</p>
          </div>

          <div className="hidden sm:block h-16 w-px bg-slate-200"></div>

          <div className="hidden sm:flex flex-col text-sm text-slate-600 space-y-1">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> 100% Genuine & Agent Warranty
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> Fast Doorstep Delivery Islandwide
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> Verified Customer Purchase Feedback
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <FiPlusCircle size={18} /> Write a Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-200 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{review.name}</h4>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                          <FaCheckCircle /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                </div>

                <div className="flex text-amber-400 text-sm">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar key={star} className={star <= review.rating ? "text-amber-400" : "text-slate-200"} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-700 inline-block mb-3 border border-purple-100">
                Product: {review.product}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                "{review.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span>Was this review helpful?</span>
              <button 
                onClick={() => handleLike(review.id)}
                className="flex items-center gap-1 text-slate-600 hover:text-purple-600 font-semibold transition-colors"
              >
                <FiThumbsUp /> Helpful ({review.likes})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Write a Review</h3>
            <p className="text-slate-500 text-sm mb-6">Share your experience with ISURI COMPUTERS</p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ruwan Perera"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-1">Select Product *</label>
                <select
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Choose a product...</option>
                  {productsList.length > 0 ? (
                    productsList.map(p => (
                      <option key={p.productId} value={p.name}>{p.name}</option>
                    ))
                  ) : (
                    <>
                      <option value="Intel Core i7 12th Gen Processor">Intel Core i7 12th Gen Processor</option>
                      <option value="NVIDIA GeForce RTX 4060 8GB">NVIDIA GeForce RTX 4060 8GB</option>
                      <option value="Corsair Vengeance LPX 16GB DDR4 RAM">Corsair Vengeance LPX 16GB DDR4 RAM</option>
                      <option value="Samsung 980 500GB NVMe SSD">Samsung 980 500GB NVMe SSD</option>
                      <option value="ASUS TUF Gaming B650M-PLUS Motherboard">ASUS TUF Gaming B650M-PLUS Motherboard</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-1">Rating *</label>
                <div className="flex text-amber-400 text-2xl gap-2 py-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <FaStar className={(hoverRating || rating) >= star ? "text-amber-400" : "text-slate-200"} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-1">Your Review *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe product quality, delivery speed, and performance..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 text-white font-semibold text-sm rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
