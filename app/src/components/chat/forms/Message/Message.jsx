import React, { useContext, useEffect, useState } from 'react';
import styles from './Message.module.css';
import TextArea from '../../../inputs/TextArea/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  ERROR,
  // SUCCESS,
  ToastContext,
} from '../../../../contexts/ToastContext';
import {
  useDispatch,
  //useDispatch,
  useSelector,
} from 'react-redux';
import { PENDING } from '../../../../Helpers/loadingStates';
// import { sendMessageThunk } from '../../../../redux/message/message.slice';
import { object } from 'prop-types';
import { reconnect } from '../../../../redux/socket/socket.slice';
import { appendMessage } from '../../../../redux/message/message.slice';

export default function Message() {
  // const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { status } = useSelector(state => state.message);
  const { socket } = useSelector(state => state.socket);

  const { setToastState } = useContext(ToastContext);
  const [data, setData] = useState({
    sender: user?.id,
  });

  const handleChange = e => {
    const {
      target: { name, value },
    } = e;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = () => {
    socket?.emit('typing');
  };

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      socket?.send(data);
      setData(prevState => ({ ...prevState, text: '' }));

      /*
      const result = await dispatch(sendMessageThunk(data));

      setToastState(prevState => {
        return {
          ...prevState,
          show: true,
          message: (status % 10) - status / 10 === 20 ? 'Updated' : '',
          // message: JSON.stringify(result),
          title: SUCCESS,
          delay: 3000,
        };
      });*/
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

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextArea
        name="text"
        onChange={handleChange}
        placeholder="Talk"
        onKeyUp={handleKeyPress}
        className={styles.textArea}
        value={data?.text}
        rows="5"
      />
      <button className={styles.send} disabled={status === PENDING}>
        <FontAwesomeIcon icon={status === PENDING ? faSpinner : faPaperPlane} />
      </button>
    </form>
  );
}
