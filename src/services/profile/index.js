import api from '@/lib/axios';

// GET Profile
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

// POST Create Profile
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

// PUT Update Profile
export const updateProfile = async (data, token) => {
  try {
    const response = await api.put('/updateProfile', data, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update profile.';
  }
};
