import React, {
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ERROR, ToastContext } from '../../../../contexts/ToastContext';
import {
  fetchCountByContactIdThunk,
  fetchMessagesThunk,
} from '../../../../redux/message/message.slice';
import MessageCard from '../../cards/Message';
import styles from './Messages.module.css';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj

const STEP = 10;

export default function Messages() {
  const { setToastState } = useContext(ToastContext);
  const dispatch = useAppDispatch();
  const { messages, target } = useAppSelector(state => state.message);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState(STEP);

  const incrementPage = () => {
    const maxPage = Math.ceil(total / STEP);
    setPage(prevState => (prevState >= maxPage ? maxPage : prevState + 1));
  };

  const decrementPage = () => {
    setPage(prevState => (prevState <= 1 ? 1 : prevState - 1));
  };

  useEffect(() => {
    const init = async () => {
      try {
        const _total = await dispatch(
          fetchCountByContactIdThunk(target!),
        ).unwrap();
        setTotal(_total);
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
      } catch (error: any) {
        setToastState!(prevState => {
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
  }, [target, page, total]);

  const loadPrevious = () => {
    incrementPage();

    containerRef?.current?.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const loadNext = () => {
    decrementPage();

    containerRef?.current?.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const containerRef = useRef<HTMLDivElement>();

  return (
    <div
      className={styles.container}
      ref={containerRef as RefObject<HTMLDivElement>}>
      {page != null && page < Math.ceil(total / STEP) && (
        <button className={styles.loadMore} onClick={loadPrevious}>
          <FaArrowUp />
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
      {page != null && page > 1 && (
        <button className={styles.loadMore} onClick={loadNext}>
          <FaArrowDown />
        </button>
      )}
    </div>
  );
}
