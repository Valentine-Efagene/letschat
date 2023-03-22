import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CustomException } from '../../helpers/error';
import { IAuthCredentials, IUser } from '../../types/user';

const API_BASE_URL = 'http://localhost:3600';

const getCurrentUser: () => { user: IUser | null, token: string | null } = () => {
  const token = localStorage.getItem('access-token');
  const user = token ? jwt_decode(token) as IUser : null;
  return { user, token }
}

async function fetchCurrentUser() {
  const { user, token } = getCurrentUser()

  if (user) {
    const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
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
async function signIn(credentials: IAuthCredentials) {
  const response = await axios.post('http://localhost:3600/auth', credentials);

  if (response?.status > 399) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const {
    data: { accessToken, refreshToken, id },
  } = response;

  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('refresh-token', refreshToken);
  localStorage.setItem('user-id', id);

  const _user = accessToken ? jwt_decode(accessToken) : null;

  if (_user == null) return null;

  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res?.status > 399) {
    throw new CustomException(res?.statusText, res?.status);
  }

  const data = await res.json();
  return data;
}

/**
 *
 * @param {{email, password}} credentials
 */
async function signUp(credentials: IAuthCredentials) {
  const { id } = await axios.post('http://localhost:3600/users', credentials);

  if (id) {
    return signIn(credentials);
  }

  return null;
}

/**
 *
 */
async function fetchTotal() {
  const accessToken = localStorage.getItem('access-token');

  const response = await fetch(`${API_BASE_URL}/users/total`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response?.status > 399) {
    throw new CustomException(response?.statusText, response?.status);
  }

  const data = await response.json();
  return data;
}

async function fetchUserById(id: string) {
  if (id == null) return null;

  const { user, token } = getCurrentUser()

  if (user) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  }

  return null;
}

async function fetchAllUsers(page: number | null = 0, limit = 6) {
  const token = localStorage.getItem('access-token');

  if (token) {
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

    return await response.json();
  }
}

async function fetchContacts() {
  const { user, token } = getCurrentUser()

  if (token == null) return null;


  if (user == null || user?.id == null) return null;

  const response = await axios.get(
    `${API_BASE_URL}/users/${user.id}/contacts`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const { data } = response;

  return data;
}

async function addContactById(id: string) {
  if (id == null) return null;

  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(token) as IUser : null;

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

    const { data } = response;

    return data;
  }

  return null;
}

async function removeContactById(id: string) {
  if (id == null) return null;

  const token = localStorage.getItem('access-token');

  const _user = token ? jwt_decode(token) as IUser : null;

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
async function updateUser(userData: any) {
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
  fetchTotal,
};
