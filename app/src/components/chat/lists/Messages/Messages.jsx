import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, ToastContext } from '../../../../contexts/ToastContext';
import {
  appendMessage,
  fetchMessagesThunk,
} from '../../../../redux/message/message.slice';
import MessageCard from '../../cards/Message';
import styles from './Messages.module.css';
import { useParams } from 'react-router-dom';

// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj

export default function Messages() {
  const { setToastState } = useContext(ToastContext);
  const dispatch = useDispatch();
  const { socket } = useSelector(state => state.socket);
  const { messages } = useSelector(state => state.message);
  const { id: target } = useParams();

  useEffect(() => {
    socket?.on('connect', () => {});

    socket?.on('disconnect', () => {});

    socket?.on('response', message => {
      dispatch(appendMessage(message));
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchMessagesThunk(target));
      } catch (error) {
        setToastState(prevState => {
          return {
            ...prevState,
            show: true,
            message: error?.message,
            title: 'Error',
            delay: 3000,
            type: ERROR,
          };
        });
      }
    };

    init();
  }, [target]);

  return (
    <div className={styles.container}>
      {messages?.map((message, index) => (
        <MessageCard
          isLastMessage={index + 1 === messages?.length}
          key={message?.id}
          message={message}
        />
      ))}
    </div>
  );
}
