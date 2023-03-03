import React, { useContext, useEffect, useState } from 'react';
import styles from './Message.module.css';
import TextArea from '../../../inputs/TextArea/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperclip,
  faPaperPlane,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { ERROR, ToastContext } from '../../../../contexts/ToastContext';
import { useDispatch, useSelector } from 'react-redux';
import { PENDING } from '../../../../Helpers/loadingStates';
import { useParams } from 'react-router-dom';
import AttachmentPicker from '../../../inputs/AttachmentPicker/AttachmentPicker';

export default function Message() {
  const { user } = useSelector(state => state.auth);
  const { status } = useSelector(state => state.message);
  const { socket } = useSelector(state => state.socket);

  const { setToastState } = useContext(ToastContext);
  const [data, setData] = useState({});

  const { id: receiver } = useParams();

  useEffect(() => {
    setData(prevState => ({ ...prevState, receiver }));

    // dispatch(fetchByIdThunk(receiver)).then(user => {
    //   dispatch(setTarget(user));
    // });
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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      socket?.send({ ...data, sender: user?.id });
      setData(prevState => ({ ...prevState, text: '' }));
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
      <div className={styles.controls}>
        <button className={styles.send} disabled={status === PENDING}>
          <FontAwesomeIcon
            icon={status === PENDING ? faSpinner : faPaperPlane}
          />
        </button>
        <AttachmentPicker />
      </div>
    </form>
  );
}
