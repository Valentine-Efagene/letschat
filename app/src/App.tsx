//import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import Auth from './pages/Auth/Auth';
import Login from './components/auth/forms/Login';
import SignUp from './components/auth/forms/SignUp';
import { useEffect, useState } from 'react';
import { ToastContext, SUCCESS, IToastState } from './contexts/ToastContext';
import Toast from './components/Toast';
import Users from './pages/Users';
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
import { useAppDispatch, useAppSelector } from './redux/hooks';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AuthRoute from './components/routes/AuthRoute';
// https://codesandbox.io/s/react-router-tutorial-loader-and-action-3qr3p8?file=/src/routes/contact.jsx

function App() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector(state => state.user);

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

    socket?.on('typing-response', sender => {
      dispatch(pushTyping(sender));
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

      dispatch(fetchTotalThunk());
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
      element: (
        <ProtectedRoute token={token}>
          <Chat />
        </ProtectedRoute>
      ),
    },
    {
      path: '/users',
      element: (
        <ProtectedRoute token={token}>
          <Users />
        </ProtectedRoute>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute token={token}>
          <Profile />
        </ProtectedRoute>
      ),
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

  const [toastState, setToastState] = useState<IToastState>({
    show: false,
    title: null,
    message: null,
    type: SUCCESS,
    delay: 3000,
  });

  const closeToast = () =>
    setToastState(prevState => ({ ...prevState, show: false }));

  return (
    <ToastContext.Provider value={{ toastState, setToastState }}>
      <RouterProvider router={router} />
      <Toast
        show={toastState?.show}
        onClose={() => closeToast()}
        type={toastState?.type}
        delay={toastState?.delay}
        message={toastState?.message}
        title={toastState?.title}
      />
    </ToastContext.Provider>
  );
}

export default App;
