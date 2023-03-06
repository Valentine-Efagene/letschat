import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../../components/contacts/Grid/Grid';
import List from '../../components/contacts/List/List';
import Button from '../../components/inputs/Button/Button';
import { ERROR, ToastContext } from '../../contexts/ToastContext';
import {
  fetchAllUsersThunk,
  fetchTotalThunk,
} from '../../redux/user/user.slice';
import styles from './Contacts.module.css';
import { addContactThunk } from '../../redux/user/user.slice';
import Paginator from '../../components/common/Paginator/Paginator';
const API_BASE_URL = 'http://localhost:3000';
import { useSearchParams } from 'react-router-dom';

const GRID = 'grid';
const LIST = 'list';

// 4 is the default value in the front-end API
const generatePaginationLinks = (total, perPage = 4) => {
  const count = Math.ceil(total / perPage);
  const links = Array(count).fill('');

  for (let index = 0; index < links.length; index++) {
    // +1 because the pagination is 1-based
    links[index] = `/users?page=${index + 1}`;
  }

  return links;
};

export default function Contacts() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { user, users, error, total } = useSelector(state => state.user);
  const { setToastState } = useContext(ToastContext);
  const page = searchParams.get('page') ?? 1;

  const [layout, setLayout] = useState(GRID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalThunk()).then(() => {
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
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchAllUsersThunk(page - 1));

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
  }, [page]);

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

  const generateURL = (page, limit = 4) => {
    return page > 0
      ? `${API_BASE_URL}/users?page=${page}&limit=${limit}`
      : null;
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
      <Paginator
        currentPage={page}
        nextPageUrl={generateURL(page + 1)}
        prevPageUrl={generateURL(page - 1)}
        links={generatePaginationLinks(total, 4)}
        lastPage={4}
      />
    </div>
  );
}
