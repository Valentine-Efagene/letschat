import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './Master.module.css';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import QuickProfile from '../QuickProfile/QuickProfile';
import Contact from '../cards/Contact/Contact';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Master() {
  const { socket } = useSelector(state => state.socket);
  const { user } = useSelector(state => state.user);
  const [showQuickProfile, setShowQuickProfile] = useState(false);
  const { id: target } = useParams();

  const showQuick = () => setShowQuickProfile(true);
  const hideQuick = () => setShowQuickProfile(false);

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
        {user?.contacts?.map(contact => {
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
