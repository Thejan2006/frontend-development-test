import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5']
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      minlength: [10, 'Comment must be at least 10 characters'],
      maxlength: [1000, 'Comment must not exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'hidden'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

reviewSchema.index({ userId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
