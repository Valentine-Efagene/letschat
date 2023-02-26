//import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import Auth from './pages/Auth/Auth';
import Login from './components/auth/forms/Login';
import SignUp from './components/auth/forms/SignUp';
import UserContext from './contexts/userContext';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { ToastContext, SUCCESS } from './contexts/ToastContext';
import Toast from './components/Toast';
import axios from 'axios';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/chat',
      element: <Chat />,
    },
    {
      path: '/auth',
      element: <Auth />,
      children: [
        {
          path: '/auth/login',
          element: <Login />,
        },
        {
          path: '/auth/signup',
          element: <SignUp />,
        },
      ],
    },
  ]);

  const [user, setUser] = useState();

  const update = async payload => {
    const userId = localStorage.getItem('user-id');

    try {
      const result = await axios.patch(
        //`${process.env.REACT_APP_BASE_URL}/user/${userId}`,
        `http://localhost:3000/users/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const { status, data } = result;
      setUser({ ...data, avatar: `http://localhost:3000/${data?.avatar}` });

      setToastState(prevState => {
        return {
          ...prevState,
          show: true,
          message: status === 204 ? 'Updated' : '',
          title: SUCCESS,
          delay: 3000,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access-token');

      const _user = token
        ? jwt_decode(localStorage.getItem('access-token'))
        : null;

      if (_user) {
        try {
          const res = await fetch(
            `http://localhost:3000/users/${_user.userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          //fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${_user.id}`)
          const data = await res.json();
          data.avatar = `http://localhost:3000/${data.avatar}`;
          setUser(data);
        } catch (error) {
          console.log(error);
          setUser(_user);
        }
      }
    };

    fetchUser();
  }, []);

  const [toastState, setToastState] = useState({
    show: false,
    title: null,
    message: null,
    type: SUCCESS,
    delay: null,
  });

  const closeToast = () =>
    setToastState(prevState => ({ ...prevState, show: false }));

  return (
    <ToastContext.Provider value={{ toastState, setToastState }}>
      <UserContext.Provider value={{ user, setUser, update }}>
        <RouterProvider router={router} />
        <Toast
          show={toastState?.show}
          onClose={() => closeToast(false)}
          type={toastState?.type}
          delay={toastState?.delay}
          message={toastState?.message}
          title={toastState?.title}
        />
      </UserContext.Provider>
    </ToastContext.Provider>
  );
}

export default App;
