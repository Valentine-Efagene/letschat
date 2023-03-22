import React, { useContext, useEffect, useState } from 'react';
import styles from './Master.module.css';
import { FaComment, FaFileAlt, FaUser } from 'react-icons/fa';
import QuickProfile from '../QuickProfile/QuickProfile';
import Contact from '../cards/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchContactsThunk } from '../../../redux/user/user.slice';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import socket from '../../../services/socket';
import {
  fetchLastMessagesThunk,
  setTarget,
} from '../../../redux/message/message.slice';

export default function Master() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, contacts } = useSelector(state => state.user);
  const { peers, target, lastMessages } = useSelector(state => state.message);
  const { setToastState } = useContext(ToastContext);
  const [showQuickProfile, setShowQuickProfile] = useState(false);

  const showQuick = () => setShowQuickProfile(true);
  const hideQuick = () => setShowQuickProfile(false);

  useEffect(() => {
    const init = async () => {
      try {
        const _contacts = await dispatch(fetchContactsThunk()).unwrap();

        const contactIds = _contacts?.map(contact => contact.id);

        if (contactIds == null) return;

        await dispatch(fetchLastMessagesThunk(contactIds)).then(() => {
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
      } catch (error) {
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
      }
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
            <FaUser size="1x" />
          )}
        </button>
        <button className={styles.newChat}>
          <FaComment className={styles.chatIcon} />
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

          const lastMessage = lastMessages?.find(message => {
            if (message == null) return;

            const { sender, receiver } = message;
            return id === sender || id === receiver;
          });

          let snippet = lastMessage?.text ?? '';

          if (
            lastMessage &&
            (lastMessage.text == null || lastMessage.text?.length < 1) &&
            lastMessage.files?.length > 0
          ) {
            snippet = <FaFileAlt size="1x" />;
          }

          return (
            <Contact
              snippet={snippet}
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
