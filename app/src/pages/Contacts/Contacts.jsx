import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../../components/contacts/Grid/Grid';
import List from '../../components/contacts/List/List';
import Button from '../../components/inputs/Button/Button';
import { fetchAllUsersThunk } from '../../redux/user/user.slice';
import styles from './Contacts.module.css';

const GRID = 'grid';
const LIST = 'list';

export default function Contacts() {
  const { user, users } = useSelector(state => state.user);

  const [layout, setLayout] = useState(GRID);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchAllUsersThunk());
    };

    init();
  }, []);

  const toggleLayout = () =>
    setLayout(prevState => (prevState === GRID ? LIST : GRID));

  const otherUsers = users?.filter(_user => _user.id !== user?.id);

  return (
    <div className={styles.container}>
      <Button variant="outline" onClick={toggleLayout}>
        <FontAwesomeIcon icon={layout === GRID ? faList : faTh} />
      </Button>

      {layout === GRID ? (
        <Grid users={otherUsers} />
      ) : (
        <List users={otherUsers} />
      )}
    </div>
  );
}
