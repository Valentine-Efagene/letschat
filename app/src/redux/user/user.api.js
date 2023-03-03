import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_BASE_URL = 'http://localhost:3000';

async function fetchCurrentUser() {
  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(localStorage.getItem('access-token')) : null;

  if (_user) {
    const res = await fetch(`${API_BASE_URL}/users/${_user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${_user.id}`)
    const data = await res.json();
    return data;
  }

  return null;
}

/**
 *
 * @param {{email, password}} credentials
 */
async function signIn(credentials) {
  const {
    data: { accessToken, refreshToken, id },
  } = await axios.post('http://localhost:3000/auth', credentials);

  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('refresh-token', refreshToken);
  localStorage.setItem('user-id', id);

  const _user = accessToken
    ? jwt_decode(localStorage.getItem('access-token'))
    : null;

  if (_user) {
    const res = await fetch(`${API_BASE_URL}/users/${_user.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();
    data.avatar = `${API_BASE_URL}/${data.avatar}`;

    return _user;
  }

  return null;
}

/**
 *
 * @param {{email, password}} credentials
 */
async function signUp() {}

async function fetchUserById(id) {
  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(localStorage.getItem('access-token')) : null;

  if (_user) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  }

  return null;
}

async function fetchAllUsers() {
  const token = localStorage.getItem('access-token');

  if (token) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await response.json();
  }

  return null;
}

async function fetchContacts() {
  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(localStorage.getItem('access-token')) : null;

  if (_user) {
    const response = await axios.get(
      `${API_BASE_URL}/users/${_user.id}/contacts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response;
  }

  return null;
}

async function addContactById(id) {
  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(localStorage.getItem('access-token')) : null;

  if (_user) {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${_user.id}/contacts/add`,
      {
        contactId: id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response;
  }

  return null;
}

async function removeContactById(id) {
  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(localStorage.getItem('access-token')) : null;

  if (_user) {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${_user.id}/contacts/remove`,
      {
        contactId: id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response;
  }

  return null;
}

/**
 *
 * @param {{email, password}} credentials
 */
async function updateUser(userData) {
  const id = localStorage.getItem('user-id');
  const token = localStorage.getItem('access-token');

  const formData = new FormData();
  for (const key in userData) {
    formData.set(key, userData[key]);
  }

  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
}

export {
  updateUser,
  fetchUserById,
  addContactById,
  removeContactById,
  fetchContacts,
  fetchAllUsers,
  fetchCurrentUser,
  signIn,
  signUp,
};
