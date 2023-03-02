import { faDashboard, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '../../components/contacts/Grid/Grid';
import List from '../../components/contacts/List/List';
import Button from '../../components/inputs/Button/Button';
import styles from './Contacts.module.css';

const GRID = 'grid';
const LIST = 'list';

export default function Contacts() {
  const { user } = useSelector(state => state.auth);
  const [layout, setLayout] = useState(GRID);
  const contacts = [user, user, user, user];

  const toggleLayout = () =>
    setLayout(prevState => (prevState === GRID ? LIST : GRID));

  return (
    <div className={styles.container}>
      <Button variant="outline" onClick={toggleLayout}>
        <FontAwesomeIcon icon={layout === GRID ? faList : faDashboard} />
      </Button>

      {layout === GRID ? (
        <Grid contacts={contacts} />
      ) : (
        <List contacts={contacts} />
      )}
    </div>
  );
}
