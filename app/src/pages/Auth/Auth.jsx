import React from 'react';
import Layout from '../../components/layouts/Layout/Layout';
import styles from './Auth.module.css';
import { Outlet } from 'react-router-dom';

export default function Auth() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
