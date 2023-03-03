import React, { useEffect } from 'react';
import Detail from '../../components/chat/Detail/Detail';
import Master from '../../components/chat/Master/Master';
import styles from './DesktopChat.module.css';
import { useParams } from 'react-router-dom';
import { setTarget } from '../../redux/message/message.slice';
import { useDispatch } from 'react-redux';

export default function DesktopChat() {
  const dispatch = useDispatch();
  const { id: target } = useParams();

  useEffect(() => {
    dispatch(setTarget(target));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.master}>
        <Master />
      </div>
      <div className={styles.detail}>
        <Detail target={target} />
      </div>
    </div>
  );
}
