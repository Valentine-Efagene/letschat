import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, ToastContext } from '../../../../contexts/ToastContext';
import {
  fetchCountByContactIdThunk,
  fetchMessagesThunk,
} from '../../../../redux/message/message.slice';
import MessageCard from '../../cards/Message';
import styles from './Messages.module.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowUp19 } from '@fortawesome/free-solid-svg-icons';

// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj

const STEP = 2;

export default function Messages() {
  const { setToastState } = useContext(ToastContext);
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.message);
  const { id: target } = useParams();
  const [page, setPage] = useState(null);
  const [limit, setLimit] = useState(STEP);

  useEffect(() => {
    const init = async () => {
      const total = await dispatch(fetchCountByContactIdThunk(target)).unwrap();
      setPage(Math.floor(total / STEP));
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        // The calculation is to get the last page (zero-based)
        dispatch(
          fetchMessagesThunk({
            target,
            page,
            limit,
          }),
        );
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

    if (page) {
      init();
    }
  }, [target, limit, page]);

  const loadMore = () => {
    setPage(prevState => prevState - 1);

    containerRef?.current?.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const containerRef = useRef();

  return (
    <div className={styles.container} ref={containerRef}>
      {page && page !== 0 && (
        <button className={styles.loadMore} onClick={loadMore}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      {messages?.map((message, index) => (
        <MessageCard
          isLastMessage={index + 1 === messages?.length}
          isFirstMessage={index === 0}
          key={message?.id}
          message={message}
        />
      ))}
    </div>
  );
}
