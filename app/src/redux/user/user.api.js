import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_BASE_URL = 'http://localhost:3000';

async function fetchUserById(id) {
  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(localStorage.getItem('access-token')) : null;

  if (_user) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  }

  return null;
}

/**
 *
 * @param {{email, password}} credentials
 */
async function updateUser(id, userData) {
  const token = localStorage.getItem('access-token');

  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
}

export { updateUser, fetchUserById };