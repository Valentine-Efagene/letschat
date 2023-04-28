import axios from 'axios';
import { CustomException } from '../../helpers/error';

const API_BASE_URL = 'http://localhost:3600';

async function sendMessage(messageData: any, token: string) {
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

async function fetchMessages(
  target: string,
  page: number,
  limit = 5,
  uid: string,
  token: string,
) {
  const response = await fetch(
    `${API_BASE_URL}/${uid}/messages/${target}?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.json();
}

async function fetchLastMessages(contacts: string, uid: string, token: string) {
  const response = await axios.post(
    `${API_BASE_URL}/${uid}/messages/last`,
    { contacts },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const { data } = response;

  return data;
}

async function fetchCountByContactId(
  contactId: string,
  uid: string,
  token: string,
) {
  const response = await fetch(
    `${API_BASE_URL}/${uid}/messages/${contactId}/count`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (response?.status > 399) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const data = await response.json();
  return data;
}

export { sendMessage, fetchMessages, fetchCountByContactId, fetchLastMessages };
