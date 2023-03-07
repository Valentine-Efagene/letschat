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
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCurrentUserThunk,
  fetchTotalThunk,
} from './redux/user/user.slice';
import {
  appendMessage,
  pushTyping,
  removeTyping,
  setPeers,
} from './redux/message/message.slice';
import Profile from './pages/Profile';
import socket from './services/socket';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    socket?.on('disconnect', () => {
      console.log('Disconnected');
    });

    socket?.on('connection', () => {});

    socket?.on('connect-response', data => {
      dispatch(setPeers(data));
    });

    socket?.on('done-typing-response', data => {
      dispatch(removeTyping(data));
    });

    socket?.on('typing-response', data => {
      dispatch(pushTyping(data));
    });

    socket?.on('message-response', message => {
      dispatch(appendMessage(message));
    });

    socket.on('connect_failed', () => {
      console.log('Failed');
    });

    socket.on('connect_error', err => {
      console.log(err.message);
    });

    const init = () => {
      dispatch(fetchCurrentUserThunk()).then(() => {
        if (user == null) return;

        if (!socket?.connected) {
          socket.auth = { userId: user?.id };
          socket.connect();
        }
      });
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
      path: '/chat/:id',
      element: <Chat />,
    },
    {
      path: '/users',
      element: <Contacts />,
      loader: async () => {
        return await dispatch(fetchTotalThunk()).unwrap();
      },
    },
    {
      path: '/profile',
      element: <Profile />,
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
