import api from '@/lib/axios';

export const getInterest = async (token) => {
  try {
    const response = await api.get('/getProfile', {
      headers: { 'x-access-token': token },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch profile.';
  }
};

export const saveInterest = async (data, token) => {
  try {
    const response = await api.post('/createProfile', data, {
      headers: { 'x-access-token': token },
    });
    return response.data.message;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to save profile.';
  }
};

export const updateInterest = async (data, token) => {
  try {
    const response = await api.put('/updateProfile', data, {
      headers: { 'x-access-token': token },
    });
    return response.data.message;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update profile.';
  }
};
