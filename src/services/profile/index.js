import api from '@/lib/axios';

export const getProfile = async (token) => {
  try {
    const response = await api.get('/getProfile', {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch profile.';
  }
};

export const createProfile = async (data, token) => {
  try {
    const response = await api.post('/createProfile', data, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create profile.';
  }
};
