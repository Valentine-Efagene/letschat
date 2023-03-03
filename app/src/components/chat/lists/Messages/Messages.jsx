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

// https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/

export default function Messages() {
  const { setToastState } = useContext(ToastContext);
  const dispatch = useDispatch();
  const { socket } = useSelector(state => state.socket);
  const { messages } = useSelector(state => state.message);
  const ref = useRef();
  const { id: target } = useParams();

  const scrollToBottom = () => {
    const timeout = setTimeout(() => {
      if (ref?.current) {
        ref.current.scrollTo(0, ref.current.scrollHeight);
      }

      return () => {
        clearTimeout(timeout);
      };
    }, 100);
  };

  useEffect(() => {
    socket?.on('connect', () => {});

    socket?.on('disconnect', () => {});

    socket?.on('response', message => {
      dispatch(appendMessage(message));
      scrollToBottom();
    });

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
    scrollToBottom();
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      {messages?.map(message => (
        <MessageCard key={message?.id} message={message} />
      ))}
    </div>
  );
}
