import client from './client.js';

export const registerUser = async (payload) => {
  const { data } = await client.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await client.post('/auth/login', payload);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await client.get('/auth/me');
  return data;
};
