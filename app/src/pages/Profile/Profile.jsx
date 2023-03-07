import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalScrollContainer from '../../components/common/HorizontalScrollContainer/HorizontalScrollContainer';
import Layout from '../../components/layouts/Layout';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useSelector(state => state.user);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img src={user?.avatar} alt="" />
        </div>
        <HorizontalScrollContainer
          shouldTransformScroll={true}
          className={styles.statuses}>
          {[1, 2, 3, 4, 5].map(status => (
            <div key={status} className={styles.statusCard}>
              {status}
            </div>
          ))}
        </HorizontalScrollContainer>
      </div>
    </Layout>
  );
}
