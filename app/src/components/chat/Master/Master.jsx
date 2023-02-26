import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import styles from './Master.module.css';
import avatar from '../../../assets/img/avatar.jpg';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import QuickProfile from '../QuickProfile/QuickProfile';
import Contact from '../cards/Contact/Contact';
import UserContext from '../../../contexts/userContext';

export default function Master() {
  const { user } = useContext(UserContext);
  const [showQuickProfile, setShowQuickProfile] = useState(false);

  const showQuick = () => setShowQuickProfile(true);
  const hideQuick = () => setShowQuickProfile(false);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button onClick={showQuick} className={styles.avatar}>
          <img src={user?.avatar ?? avatar} />
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
