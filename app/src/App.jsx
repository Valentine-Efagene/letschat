//import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import Auth from './pages/Auth/Auth';
import Login from './components/auth/forms/Login';
import SignUp from './components/auth/forms/SignUp';
import UserContext from './contexts/userContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ToastContext, SUCCESS } from './contexts/ToastContext';
import Toast from './components/Toast';

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

  const login = e => {
    e?.preventDefault();
    const userId = localStorage.getItem('user-id');

    try {
      const { data: statusCode } = axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      );

      setToastState(prevState => {
        if (e == null) return prevState;

        return {
          ...prevState,
          message: statusCode,
          title: SUCCESS,
          delay: 500,
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
        console.log(`http://localhost:3000/users/${_user.userId}`);
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
          console.table(data);
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
      <UserContext.Provider value={{ user, setUser, login }}>
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
