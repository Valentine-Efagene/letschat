import { object } from 'prop-types';
import React from 'react';
import styles from './VideoPane.module.css';

VideoPane.propTypes = {
  videoRef: object,
  canvasRef: object,
  img: object,
};

export default function VideoPane({ img, videoRef, canvasRef }) {
  return (
    <div className={styles.container}>
      <video ref={videoRef} className={styles.video} src=""></video>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={320}
        height={240}></canvas>
      {img && <img src={img} alt="" className={styles.img} />}
    </div>
  );
}
