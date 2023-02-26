import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import TextArea from '../../inputs/TextArea/TextArea';
import styles from './Detail.module.css';

export default function Detail() {
  const [data, setData] = useState();

  const handleChange = e => {
    const {
      target: { name, value },
    } = e;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.chat}></div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextArea
          name="text"
          onChange={handleChange}
          placeholder="Talk"
          className={styles.textArea}
          value={data?.text}
          rows="5"
        />
        <button className={styles.send}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
