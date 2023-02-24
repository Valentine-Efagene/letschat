import React, { useState } from 'react';
import avatar from '../../../assets/img/avatar.jpg';
import styles from './QuickProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bool, func, string } from 'prop-types';
import { faArrowLeftLong, faSave } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from '../../inputs/ImagePicker/ImagePicker';
import TextField from '../../inputs/TextField/TextField';
import Button from '../../inputs/Button/Button';

QuickProfile.propTypes = {
  className: string,
  hide: func,
  show: bool,
};

export default function QuickProfile({ className, hide, show }) {
  const [data, setData] = useState({});

  const handleAvatarChange = ref => {
    handleChange({ target: { name: 'avatar', value: ref.current?.files[0] } });
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div
      className={`${show ? styles.in : styles.out} ${className} ${
        styles.container
      }`}>
      <div className={styles.top}>
        <button onClick={hide} className={styles.back}>
          <FontAwesomeIcon className={styles.icon} icon={faArrowLeftLong} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <ImagePicker
          style={{ margin: 'auto' }}
          className={avatar}
          onChange={handleAvatarChange}
          value={data?.avatar}
        />
        <label className={styles.label}>
          Email
          <TextField
            name="email"
            type="email"
            value={data?.value}
            onChange={handleChange}
            placeholder="email"
          />
        </label>
        <label className={styles.label}>
          First Name
          <TextField
            name="firstName"
            value={data?.value}
            onChange={handleChange}
            placeholder="First Name"
          />
        </label>
        <label className={styles.label}>
          Last Name
          <TextField
            name="lastName"
            value={data?.value}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </label>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon
            style={{ width: '1rem', height: '1rem' }}
            icon={faSave}
          />
        </Button>
      </form>
    </div>
  );
}
