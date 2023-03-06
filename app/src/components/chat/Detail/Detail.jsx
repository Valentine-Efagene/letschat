import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import Header from '../../messages/Header/Header';
import MessageForm from '../forms/Message';
import Messages from '../lists/Messages/Messages';
import styles from './Detail.module.css';
import ImagesSection from '../forms/ImagesSection/ImagesSection';
import { sendMessageThunk } from '../../../redux/message/message.slice';

export default function Detail() {
  const { user } = useSelector(state => state.user);
  const { status } = useSelector(state => state.message);
  const { socket } = useSelector(state => state.socket);
  const { id: receiver } = useParams();

  const defaultData = {
    text: '',
    images: null,
    receiver,
    sender: user?.id,
  };

  const { setToastState } = useContext(ToastContext);
  const [data, setData] = useState(defaultData);
  const dispatch = useDispatch();

  const handleChange = e => {
    const {
      target: { name, value },
    } = e;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleTyping = () => {
    socket?.emit('typing', user?.id);
  };

  const handleDoneTyping = () => {
    socket?.emit('done-typing', user?.id);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const message = await dispatch(
        sendMessageThunk({ ...data, sender: user?.id, receiver }),
      ).unwrap();
      socket?.send(message);
      setData(defaultData);
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

  const handleImagesPicked = ref => {
    handleChange({ target: { name: 'images', value: ref.current?.files } });
  };

  return (
    <div className={styles.container}>
      <Header />
      {data?.images ? (
        <ImagesSection images={Array.from(data?.images)} />
      ) : (
        <Messages />
      )}
      <MessageForm
        handleImagesPicked={handleImagesPicked}
        handleChange={handleChange}
        handleDoneTyping={handleDoneTyping}
        handleTyping={handleTyping}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
