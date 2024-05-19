import axios from 'axios';

export const createList = async (data) => {
  try {
    const response = await axios.post('/lists/', data);
    return response.data; // Assuming the created list object is returned in the response
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
};

export const getList = async (listId) => {
  try {
    const response = await axios.get(`/lists/${listId}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching list:', error);
    throw error;
  }
};

export const getAllLists = async () => {
  try {
    const response = await axios.get('/lists/lists');
    return response.data;
  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
};

export const getUsersForList = async (listId) => {

  try {
    const response = await axios.get(`/users/${listId}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users for list:', error);
    throw error;
  }
};

export const uploadCSV = (listId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`/users/${listId}/userList`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const sendEmail = (listId, emailData) => {
  return axios.post(`/emails/${listId}/send-email`, emailData); // Send emailData in the request body
};

export const getUserLists = async () => {
  try {
    const response = await axios.get('/lists');
    return response.data;
  } catch (error) {
    console.error('Error fetching user lists:', error);
    throw error;
  }
};
