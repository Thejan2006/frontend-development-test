import client from './client.js';

export const fetchReviews = async () => {
  const { data } = await client.get('/reviews');
  return data;
};

export const createReview = async (payload) => {
  const { data } = await client.post('/reviews', payload);
  return data;
};

export const updateReview = async (id, payload) => {
  const { data } = await client.put(`/reviews/${id}`, payload);
  return data;
};

export const deleteReview = async (id) => {
  const { data } = await client.delete(`/reviews/${id}`);
  return data;
};
