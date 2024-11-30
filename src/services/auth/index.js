import api from '@/lib/axios';

const handleError = (error) => {
  console.error('API Error:', error);
  throw error?.response?.data?.message || 'An error occurred';
};

export const registerUser = async (data) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
