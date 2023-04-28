import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CustomException } from '../../helpers/error';
import { IAuthCredentials, IUser } from '../../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const getCurrentUser: () => {
//   user: IUser | null;
//   token: string | null;
// } = () => {
//   const token = localStorage.getItem('access-token');
//   const user = token ? (jwt_decode(token) as IUser) : null;
//   return { user, token };
// };

async function fetchCurrentUser(token: string) {
  const _user = token ? (jwt_decode(token) as IUser) : null;

  if (_user == null) {
    return null;
  }

  const res = await fetch(`${API_BASE_URL}/users/${_user.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data;
}

/**
 *
 * @param {{email, password}} credentials
 */
async function signIn(credentials: IAuthCredentials) {
  const response = await axios.post('http://localhost:3600/auth', credentials);

  if (response?.status > 399) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const {
    data: { accessToken, refreshToken, id },
  } = response;

  const _user = accessToken ? jwt_decode(accessToken) : null;

  if (_user == null) return null;

  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res?.status > 399) {
    throw new CustomException(res?.statusText, res?.status);
  }

  const user = await res.json();
  return { user, token: accessToken };
}

/**
 *
 * @param {{email, password}} credentials
 */
async function signUp(credentials: IAuthCredentials) {
  const response = await axios.post('http://localhost:3600/users', credentials);

  if (response?.status > 399) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const {
    data: { id },
  } = response;

  if (id) {
    return signIn(credentials);
  }

  return null;
}

/**
 *
 */
async function fetchTotal(token: string) {
  const response = await fetch(`${API_BASE_URL}/users/total`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response?.status > 399) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const data = await response.json();
  return data;
}

async function fetchUserById(uid: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/users/${uid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return data;
}

async function fetchAllUsers(
  token: string,
  page: number | null = 0,
  limit = 6,
) {
  const response = await fetch(
    // http://localhost:3600/users?page=1&limit=1
    `${API_BASE_URL}/users?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (response?.status !== 200) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const users = await response.json();

  return users;
}

async function fetchContacts(uid: string, token: string) {
  const response = await axios.get(`${API_BASE_URL}/users/${uid}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { data } = response;

  return data;
}

async function addContactById(contactId: string, uid: string, token: string) {
  const response = await axios.patch(
    `${API_BASE_URL}/users/${uid}/contacts/add`,
    {
      contactId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const { data } = response;

  return data;
}

async function removeContactById(id: string) {
  if (id == null) return null;

  const token = localStorage.getItem('access-token');

  const _user = token ? (jwt_decode(token) as IUser) : null;

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
async function updateUser(userData: any, uid: string, token: string) {
  const formData = new FormData();

  for (const key in userData) {
    formData.set(key, userData[key]);
  }

  const response = await axios.patch(`${API_BASE_URL}/users/${uid}`, formData, {
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
  fetchTotal,
};
