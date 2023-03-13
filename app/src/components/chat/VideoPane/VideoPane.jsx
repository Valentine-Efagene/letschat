import {
  faCheck,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bool, func, object } from 'prop-types';
import React from 'react';
import styles from './VideoPane.module.css';
// https://webrtc.org/getting-started/media-devices

VideoPane.propTypes = {
  videoRef: object,
  canvasRef: object,
  img: object,
  capturePhoto: func,
  clearPhoto: func,
  addPhoto: func,
  isCameraOn: bool,
  setIsCameraOn: func,
  stopStreaming: func,
};

export default function VideoPane({
  clearPhoto,
  img,
  videoRef,
  canvasRef,
  capturePhoto,
  addPhoto,
  setIsCameraOn,
  isCameraOn,
  stopStreaming,
}) {
  return (
    <div
      className={styles.container}
      style={{ display: isCameraOn ? 'grid' : 'none' }}>
      {!img && (
        <button
          className={styles.close}
          onClick={() => {
            setIsCameraOn(false);
            stopStreaming();
          }}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <img
        src={img}
        alt=""
        className={styles.img}
        style={{ display: img ? 'block' : 'none' }}
      />
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
          <button className={styles.capture} onClick={capturePhoto}>
            <div className={styles.icon}></div>
          </button>
        )}
      </div>
      {/* For constructing the image in the background */}
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
}
