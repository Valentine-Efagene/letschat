import axios from 'axios';
import { CustomException } from '../../Helpers/error';

const API_BASE_URL = 'http://localhost:3600';

async function sendMessage(messageData) {
  const token = localStorage.getItem('access-token');

  const formData = new FormData();
  const { text, sender, receiver, files } = messageData;

  formData.set('text', text);
  formData.set('sender', sender);
  formData.set('receiver', receiver);

  if (files != null) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files?.[i]);
    }
  }

  const response = await axios.post(`${API_BASE_URL}/messages`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { data } = response;

  return data;
}

async function fetchMessages(target, page, limit = 5) {
  const userId = localStorage.getItem('user-id');
  const token = localStorage.getItem('access-token');

  const response = await fetch(
    `${API_BASE_URL}/${userId}/messages/${target}?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.json();
}

async function fetchLastMessages(contacts) {
  const userId = localStorage.getItem('user-id');
  const token = localStorage.getItem('access-token');

  const response = await axios.post(
    `${API_BASE_URL}/${userId}/messages/last`,
    { contacts },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const { data } = response;

  return data;
}

async function fetchCountByContactId(contactId) {
  const userId = localStorage.getItem('user-id');
  const accessToken = localStorage.getItem('access-token');

  const response = await fetch(
    `${API_BASE_URL}/${userId}/messages/${contactId}/count`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  if (response?.status > 399) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const data = await response.json();
  return data;
}

export { sendMessage, fetchMessages, fetchCountByContactId, fetchLastMessages };
