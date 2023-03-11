import React, { useContext } from 'react';
import styles from './Profile.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from '../../../inputs/ImagePicker/ImagePicker';
import TextField from '../../../inputs/TextField/TextField';
import Button from '../../../inputs/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PENDING } from '../../../../Helpers/loadingStates';
import { SUCCESS, ToastContext } from '../../../../contexts/ToastContext';
import { updateUserThunk } from '../../../../redux/user/user.slice';

export default function Profile() {
  const dispatch = useDispatch();
  const { setToastState } = useContext(ToastContext);
  const { user, status } = useSelector(state => state.user);
  const [data, setData] = useState({
    avatar: user?.avatar ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
  });

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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await dispatch(updateUserThunk(data));

      setToastState(prevState => {
        return {
          ...prevState,
          show: true,
          //message: (status % 10) - status / 10 === 20 ? 'Updated' : '',
          message: JSON.stringify(result),
          title: SUCCESS,
          delay: 3600,
        };
      });
    } catch (error) {
      setToastState(prevState => {
        return {
          ...prevState,
          show: true,
          message: error.message,
          title: 'Error',
          delay: 3600,
        };
      });
    }
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
        {status === PENDING && (
          <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
        )}
      </Button>
    </form>
  );
}
