import client from './client.js';

export const fetchAdminReviews = async () => {
  const { data } = await client.get('/admin/reviews');
  return data;
};

export const deleteAdminReview = async (id) => {
  const { data } = await client.delete(`/admin/reviews/${id}`);
  return data;
};

export const updateAdminReviewStatus = async (id, status) => {
  const { data } = await client.patch(`/admin/reviews/${id}/status`, { status });
  return data;
};
