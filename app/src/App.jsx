//import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import Auth from './pages/Auth/Auth';
import Login from './components/auth/forms/Login';
import SignUp from './components/auth/forms/SignUp';
import { useEffect, useState } from 'react';
import { ToastContext, SUCCESS } from './contexts/ToastContext';
import Toast from './components/Toast';
import Contacts from './pages/Contacts';
import { fetchCurrentUserThunk } from './redux/auth/auth.slice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchCurrentUserThunk());
    };

    init();
  }, []);

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
      path: '/contacts',
      element: <Contacts />,
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
      <RouterProvider router={router} />
      <Toast
        show={toastState?.show}
        onClose={() => closeToast(false)}
        type={toastState?.type}
        delay={toastState?.delay}
        message={toastState?.message}
        title={toastState?.title}
      />
    </ToastContext.Provider>
  );
}

export default App;
