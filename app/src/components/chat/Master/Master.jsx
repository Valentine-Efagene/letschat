import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Master.module.css';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import QuickProfile from '../QuickProfile/QuickProfile';
import Contact from '../cards/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchContactsThunk } from '../../../redux/user/user.slice';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import socket from '../../../services/socket';
import { setTarget } from '../../../redux/message/message.slice';

export default function Master() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, contacts } = useSelector(state => state.user);
  const { peers, target } = useSelector(state => state.message);
  const { setToastState } = useContext(ToastContext);
  const [showQuickProfile, setShowQuickProfile] = useState(false);

  const showQuick = () => setShowQuickProfile(true);
  const hideQuick = () => setShowQuickProfile(false);

  useEffect(() => {
    const init = () => {
      dispatch(fetchContactsThunk()).then(() => {
        setToastState(prevState => {
          return {
            ...prevState,
            show: error != null,
            message: error?.message,
            title: error?.code,
            delay: 3600,
            type: ERROR,
          };
        });
      });
    };

    init();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button onClick={showQuick} className={styles.avatar}>
          {user?.avatar ? (
            <img src={user?.avatar} alt="" />
          ) : (
            <FontAwesomeIcon size="1x" icon={faUser} />
          )}
        </button>
        <button className={styles.newChat}>
          <FontAwesomeIcon className={styles.chatIcon} icon={faComment} />
        </button>
        <span
          className={`${
            socket.connected ? styles.connected : styles.disconnected
          } ${styles.indicator}`}></span>
      </div>
      <QuickProfile show={showQuickProfile} hide={hideQuick} />
      <div className={styles.cl}>
        {contacts?.map(contact => {
          const { id } = contact;

          return (
            <Contact
              onClick={() => {
                dispatch(setTarget(id));
                navigate('/chat');
              }}
              online={peers?.find(peer => peer === id)}
              isTarget={id === target}
              user={contact}
              key={contact}></Contact>
          );
        })}
      </div>
    </div>
  );
}
