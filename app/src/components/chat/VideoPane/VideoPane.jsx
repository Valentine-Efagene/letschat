import {
  faCheck,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { func, object } from 'prop-types';
import React from 'react';
import styles from './VideoPane.module.css';

VideoPane.propTypes = {
  videoRef: object,
  canvasRef: object,
  img: object,
  capture: func,
  clearPhoto: func,
  addPhoto: func,
};

export default function VideoPane({
  clearPhoto,
  img,
  videoRef,
  canvasRef,
  capture,
  addPhoto,
}) {
  return (
    <div className={styles.container}>
      {img && <img src={img} alt="" className={styles.img} />}
      <video
        style={{ display: img ? 'none' : 'block' }}
        ref={videoRef}
        className={styles.video}></video>
      <div className={styles.controls}>
        {img ? (
          <>
            <button className={styles.capture} onClick={clearPhoto}>
              <FontAwesomeIcon
                size="2x"
                icon={faTrashAlt}
                style={{ color: 'red' }}
              />
            </button>
            <button className={styles.capture} onClick={addPhoto}>
              <FontAwesomeIcon size="2x" icon={faCheck} />
            </button>
          </>
        ) : (
          <button className={styles.capture} onClick={capture}>
            <div className={styles.icon}></div>
          </button>
        )}
      </div>
      {/* For constructing the image in the background */}
      <canvas
        style={{ display: 'none' }}
        className={styles.canvas}
        ref={canvasRef}
        width={320}
        height={240}></canvas>
    </div>
  );
}
