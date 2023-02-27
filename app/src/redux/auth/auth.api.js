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
    data.avatar = `${API_BASE_URL}/${data.avatar}`;
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

export { fetchCurrentUser, signIn, signUp };
