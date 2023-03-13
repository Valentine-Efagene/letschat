import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, ToastContext } from '../../../../contexts/ToastContext';
import {
  fetchCountByContactIdThunk,
  fetchMessagesThunk,
} from '../../../../redux/message/message.slice';
import MessageCard from '../../cards/Message';
import styles from './Messages.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj

const STEP = 10;

export default function Messages() {
  const { setToastState } = useContext(ToastContext);
  const dispatch = useDispatch();
  const { messages, target } = useSelector(state => state.message);
  const [page, setPage] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const total = await dispatch(
          fetchCountByContactIdThunk(target),
        ).unwrap();
        setPage(prevState =>
          prevState == null ? Math.floor(total / STEP) : prevState,
        );
        // The calculation is to get the last page (zero-based)
        dispatch(
          fetchMessagesThunk({
            target,
            page,
            STEP,
          }),
        );
      } catch (error) {
        setToastState(prevState => {
          return {
            ...prevState,
            show: true,
            message: error?.message,
            title: 'Error',
            delay: 3600,
            type: ERROR,
          };
        });
      }
    };

    init();
  }, [target, page]);

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
      {page != null && page !== 0 && (
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
