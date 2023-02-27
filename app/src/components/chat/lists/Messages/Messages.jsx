import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, ToastContext } from '../../../../contexts/ToastContext';
import { fetchMessagesThunk } from '../../../../redux/message/message.slice';
import MessageCard from '../../cards/Message';
import styles from './Messages.module.css';

Messages.propTypes = {};

export default function Messages() {
  const { setToastState } = useContext(ToastContext);
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.message);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchMessagesThunk());
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
  }, []);

  return (
    <div className={styles.container}>
      {messages?.map(message => (
        <MessageCard key={message?.id} message={message} />
      ))}
    </div>
  );
}
