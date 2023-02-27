import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './Master.module.css';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import QuickProfile from '../QuickProfile/QuickProfile';
import Contact from '../cards/Contact/Contact';
import { useSelector } from 'react-redux';

export default function Master() {
  const { user } = useSelector(state => state.auth);
  const [showQuickProfile, setShowQuickProfile] = useState(false);

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
      </div>
      <QuickProfile show={showQuickProfile} hide={hideQuick} />
      <div className={styles.cl}>
        {[user, user].map(contact => {
          return (
            <Contact
              onClick={() => alert(contact.email)}
              user={contact}
              key={contact}></Contact>
          );
        })}
      </div>
    </div>
  );
}
