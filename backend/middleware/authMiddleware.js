import { verifyToken } from '../utils/jwt.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';
import User from '../models/User.js';

const extractToken = (req) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return null;
  }

  return header.split(' ')[1];
};

export const protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    throw new AppError('Not authorized, token missing', 401);
  }

  const decoded = verifyToken(token);
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError('Not authorized, user not found', 401);
  }

  req.user = user;
  next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    next();
    return;
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
    }
  } catch (error) {
    // Optional auth should never block public access.
  }

  next();
});

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
    return;
  }

  next(new AppError('Admin access required', 403));
};
