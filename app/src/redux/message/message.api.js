import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

async function sendMessage(data) {
  const token = localStorage.getItem('access-token');

  const formData = new FormData();
  for (const key in data) {
    formData.set(key, data[key]);
  }

  const response = await axios.post(`${API_BASE_URL}/messages`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

async function fetchMessages() {
  const userId = localStorage.getItem('user-id');
  const token = localStorage.getItem('access-token');

  const response = await fetch(`${API_BASE_URL}/${userId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export { sendMessage, fetchMessages };
