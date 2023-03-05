import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../../components/contacts/Grid/Grid';
import List from '../../components/contacts/List/List';
import Button from '../../components/inputs/Button/Button';
import { ERROR, ToastContext } from '../../contexts/ToastContext';
import { fetchAllUsersThunk } from '../../redux/user/user.slice';
import styles from './Contacts.module.css';
import { addContactThunk } from '../../redux/user/user.slice';

const GRID = 'grid';
const LIST = 'list';

export default function Contacts() {
  const { user, users, error } = useSelector(state => state.user);
  const { setToastState } = useContext(ToastContext);

  const [layout, setLayout] = useState(GRID);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchAllUsersThunk());

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
    };

    init();
  }, []);

  const handleAddContact = async id => {
    await dispatch(addContactThunk(id));

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
  };

  const toggleLayout = () =>
    setLayout(prevState => (prevState === GRID ? LIST : GRID));

  const otherUsers = users?.filter(_user => _user.id !== user?.id);

  return (
    <div className={styles.container}>
      <Button variant="outline" onClick={toggleLayout}>
        <FontAwesomeIcon icon={layout === GRID ? faList : faTh} />
      </Button>

      {layout === GRID ? (
        <Grid
          user={user}
          users={otherUsers}
          handleAddContact={handleAddContact}
        />
      ) : (
        <List
          user={user}
          users={otherUsers}
          handleAddContact={handleAddContact}
        />
      )}
    </div>
  );
}
