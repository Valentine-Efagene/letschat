import { FaTrashAlt, FaCheck, FaTimes } from 'react-icons/fa';
import React, { Dispatch, RefObject, SetStateAction } from 'react';
import styles from './VideoPane.module.css';
// https://webrtc.org/getting-started/media-devices

interface IVideoPaneProps {
  videoRef: object;
  canvasRef: object;
  img?: URL | string | null;
  capturePhoto: () => void;
  clearPhoto: () => void;
  addPhoto: () => void;
  isCameraOn: boolean;
  setIsCameraOn: (val: boolean) => void;
  stopStreaming: () => void;
}

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
}: IVideoPaneProps) {
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
          <FaTimes />
        </button>
      )}
      <img
        src={img as string}
        alt=""
        className={styles.img}
        style={{ display: img ? 'block' : 'none' }}
      />
      <video
        style={{ display: img ? 'none' : 'block' }}
        ref={videoRef as RefObject<HTMLVideoElement>}
        className={styles.video}></video>
      <div className={styles.controls}>
        {img ? (
          <>
            <button className={styles.delete} onClick={clearPhoto}>
              <FaTrashAlt />
            </button>
            <button className={styles.save} onClick={addPhoto}>
              <FaCheck size="2x" />
            </button>
          </>
        ) : (
          <button className={styles.capture} onClick={capturePhoto}>
            <div className={styles.icon}></div>
          </button>
        )}
      </div>
      {/* For constructing the image in the background */}
      <canvas
        className={styles.canvas}
        ref={canvasRef as RefObject<HTMLCanvasElement>}></canvas>
    </div>
  );
}
