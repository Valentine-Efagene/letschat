import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './Master.module.css';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import avatar from '../../../assets/img/avatar.jpg';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import QuickProfile from '../QuickProfile/QuickProfile';
import Contact from '../cards/Contact/Contact';

export default function Master() {
  const [showQuickProfile, setShowQuickProfile] = useState(false);

  const showQuick = () => setShowQuickProfile(true);
  const hideQuick = () => setShowQuickProfile(false);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button onClick={showQuick} className={styles.avatar}>
          <img src={avatar} />
        </button>
        <button className={styles.newChat}>
          <FontAwesomeIcon className={styles.chatIcon} icon={faComment} />
        </button>
      </div>
      <QuickProfile show={showQuickProfile} hide={hideQuick} />
      <div className={styles.cl}>
        {[
          {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@gmail.com',
            avatar,
            snippet: 'Dummy text',
          },
          {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@gmail.com',
            avatar,
            snippet: 'Dummy text from Susanne',
          },
        ].map(contact => {
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
