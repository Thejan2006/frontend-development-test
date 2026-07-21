# ReviewSphere: Review & Rating System

A production-ready review and rating platform for technology websites.

## Project Structure

```text
project-root/
+-- frontend/
¦   +-- package.json
¦   +-- vite.config.js
¦   +-- index.html
¦   +-- .env.example
¦   +-- src/
¦       +-- api/
¦       +-- components/
¦       +-- context/
¦       +-- pages/
¦       +-- routes/
¦       +-- utils/
+-- backend/
    +-- package.json
    +-- server.js
    +-- app.js
    +-- .env.example
    +-- config/
    +-- controllers/
    +-- middleware/
    +-- models/
    +-- routes/
    +-- scripts/
    +-- utils/
```

## Features

- User registration and login with JWT authentication
- Protected user profile and protected routes
- One review per user
- Create, edit, and delete own review
- Admin moderation with approve, hide, and delete controls
- MongoDB persistence with Mongoose models
- Responsive modern UI with Tailwind CSS

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/review_rating_system
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin123!
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas.
2. Create a database named `review_rating_system`.
3. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`.
4. Start MongoDB and make sure the connection string works.

## Local Setup

### From Repository Root

`ash
npm run dev
`

This starts both the backend and frontend together. Use the dedicated commands below if you want them separately.

### Backend

```bash
cd backend
npm install
npm run seed:admin
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Documentation

Base URL: `http://localhost:5000/api`

### Authentication

#### `POST /api/auth/register`
Creates a new user.

Request body:

```json
{
  "name": "Thejan Bandara",
  "email": "thejan@example.com",
  "password": "password123",
  "profileImage": "https://..."
}
```

#### `POST /api/auth/login`
Logs in an existing user.

Request body:

```json
{
  "email": "thejan@example.com",
  "password": "password123"
}
```

#### `GET /api/auth/me`
Returns the current authenticated user.

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Reviews

#### `GET /api/reviews`
Returns approved reviews for guests and approved plus own review for authenticated users.

#### `POST /api/reviews`
Creates a review for the logged-in user.

Request body:

```json
{
  "rating": 5,
  "comment": "Excellent website and professional service."
}
```

#### `PUT /api/reviews/:id`
Updates the logged-in user’s own review.

#### `DELETE /api/reviews/:id`
Deletes the logged-in user’s own review.

### Admin

#### `GET /api/admin/reviews`
Returns all reviews for admin users.

#### `DELETE /api/admin/reviews/:id`
Deletes any review as an admin.

#### `PATCH /api/admin/reviews/:id/status`
Updates review moderation status.

Request body:

```json
{
  "status": "approved"
}
```

Valid statuses:

- `pending`
- `approved`
- `hidden`

## Frontend and Backend Connection

- The frontend reads `VITE_API_URL` from `frontend/.env`.
- The Axios client sends the JWT token as a Bearer token.
- The backend allows CORS from `CLIENT_URL`.

## Deployment

### Backend

- Deploy to Render, Railway, Fly.io, or any Node.js host.
- Set environment variables from `backend/.env.example`.
- Ensure MongoDB Atlas or a hosted MongoDB URI is available.
- Set `CLIENT_URL` to your deployed frontend URL.

### Frontend

- Deploy to Vercel, Netlify, or any static host.
- Set `VITE_API_URL` to your deployed backend API URL.
- Rebuild after updating environment variables.

## Admin Access

Run the admin seed script after setting environment variables:

```bash
cd backend
npm run seed:admin
```

Use the seeded credentials from your `.env` file to sign in as admin.

## Notes

- Guests can browse approved reviews.
- Logged-in users can submit only one review.
- Editing a review sends it back to moderation.
- Admins can approve, hide, or delete reviews.


