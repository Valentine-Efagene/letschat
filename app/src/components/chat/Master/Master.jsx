import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Master.module.css';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import QuickProfile from '../QuickProfile/QuickProfile';
import Contact from '../cards/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchContactsThunk } from '../../../redux/user/user.slice';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';

export default function Master() {
  const { socket } = useSelector(state => state.socket);
  const dispatch = useDispatch();
  const { user, error, contacts } = useSelector(state => state.user);
  const { setToastState } = useContext(ToastContext);
  const [showQuickProfile, setShowQuickProfile] = useState(false);
  const { id: target } = useParams();

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
            delay: 3000,
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
            socket?.connected ? styles.connected : styles.disconnected
          } ${styles.indicator}`}></span>
      </div>
      <QuickProfile show={showQuickProfile} hide={hideQuick} />
      <div className={styles.cl}>
        {contacts?.map(contact => {
          const { id } = contact;

          return (
            <Contact
              to={`/chat/${id}`}
              isTarget={id === target}
              user={contact}
              key={contact}></Contact>
          );
        })}
      </div>
    </div>
  );
}
