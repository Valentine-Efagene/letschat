import React, { useContext } from 'react';
import styles from './Profile.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from '../../../inputs/ImagePicker/ImagePicker';
import TextField from '../../../inputs/TextField/TextField';
import Button from '../../../inputs/Button/Button';
import UserContext from '../../../../contexts/userContext';

Profile.propTypes = {};

export default function Profile() {
  const { user, update } = useContext(UserContext);
  const [data, setData] = useState(user ?? {});

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
    const formData = new FormData();

    for (const key in data) {
      formData.set(key, data[key]);
    }

    update(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <ImagePicker
        style={{ margin: 'auto' }}
        className={styles.avatar}
        onChange={handleAvatarChange}
        value={data?.avatar}
      />
      <label className={styles.label}>
        Email
        <TextField
          variant="line"
          name="email"
          type="email"
          value={data?.email}
          onChange={handleChange}
          placeholder="email"
        />
      </label>
      <label className={styles.label}>
        First Name
        <TextField
          variant="line"
          name="firstName"
          value={data?.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
      </label>
      <label className={styles.label}>
        Last Name
        <TextField
          variant="line"
          name="lastName"
          value={data?.lastName}
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
  );
}
