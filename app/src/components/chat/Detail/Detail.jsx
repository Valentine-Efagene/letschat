import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import Header from '../../messages/Header/Header';
import MessageForm from '../forms/Message';
import Messages from '../lists/Messages/Messages';
import styles from './Detail.module.css';
import { sendMessageThunk } from '../../../redux/message/message.slice';
import socket from '../../../services/socket';
import FilesSection from '../forms/FilesSection/FilesSection';
import VideoPane from '../VideoPane';

export default function Detail() {
  const dispatch = useDispatch();
  const { setToastState } = useContext(ToastContext);
  const { user } = useSelector(state => state.user);
  const { target: receiver } = useSelector(state => state.message);

  const initialData = {
    text: '',
    files: null,
    receiver,
    sender: user?.id,
  };

  const [data, setData] = useState(initialData);
  const [cameraState, setCameraState] = useState({
    on: false,
    mode: 'photo',
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    facingMode: 'environment', // user
  });
  const [videoPaneImg, setVideoPaneImg] = useState();
  const [cameraStream, setCameraStream] = useState();

  let { on: isCameraOn } = cameraState;

  const setIsCameraOn = val => {
    setCameraState(prevState => ({ ...prevState, on: val }));
  };

  const setCameraMode = mode => {
    setCameraState(prevState => ({ ...prevState, mode }));
  };

  const resetData = () => {
    setData(initialData);
  };

  useEffect(() => {
    resetData();
  }, [receiver]);

  const handleChange = e => {
    const {
      target: { name, value },
    } = e;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleTyping = () => {
    socket?.emit('typing', { receiver, sender: user?.id });
  };

  const handleDoneTyping = () => {
    socket?.emit('done-typing', { receiver, sender: user?.id });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const message = await dispatch(
        sendMessageThunk({ ...data, sender: user?.id, receiver }),
      ).unwrap();
      socket?.send(message);
      setData(initialData);
    } catch (error) {
      setToastState(prevState => {
        return {
          ...prevState,
          show: true,
          message: error?.message,
          title: 'Error',
          delay: 3600,
          type: ERROR,
        };
      });
    }
  };

  /**
   * Handler for the attachment picker
   *
   * @param {*} ref
   */
  const handleFilesPicked = ref => {
    handleChange({ target: { name: 'files', value: ref.current?.files } });
  };

  const videoRef = useRef();
  const canvasRef = useRef();

  /**
   * Release the camera
   *
   * @returns
   */
  const stopStreaming = () => {
    if (cameraStream == null) return;

    const video = videoRef.current;
    const tracks = cameraStream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });

    video.load();

    setCameraStream(null);
  };

  // https://codepen.io/bhagwatchouhan/pen/jjLJoB
  /**
   * Start up the camera
   *
   * @returns void
   */
  const initStream = () => {
    setIsCameraOn(true);
    const video = videoRef?.current;

    if (video == null) return;

    const mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport == null) return;

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then(stream => {
        setCameraStream(stream);
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.log(`An error occurred: ${error}`);
      });
  };

  /**
   * Take a still photo
   */
  const capturePhoto = () => {
    const canvas = canvasRef?.current;
    const video = videoRef?.current;

    canvas.width = screen.width;
    canvas.height = screen.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setVideoPaneImg(canvas.toDataURL('image/png'));
  };

  /**
   * Save photo
   */
  const addPhoto = () => {
    fetch(videoPaneImg)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'capture.png', { type: blob.type });

        if (data?.files == null) {
          handleChange({ target: { name: 'files', value: [file] } });
        } else {
          handleChange({
            target: { name: 'files', value: [...data.files, file] },
          });
        }

        setVideoPaneImg(null);
        setIsCameraOn(false);
        stopStreaming();
      })
      .catch(err => console.log(err));
  };

  /**
   * Reject a captured photo
   */
  const clearPhoto = () => {
    setVideoPaneImg(null);
  };

  /**
   * Decide what to display
   *
   * @returns
   */
  const getCurrentDisplay = () => {
    if (isCameraOn) {
      return null;
    } else {
      return data?.files ? (
        <FilesSection files={Array.from(data?.files)} />
      ) : (
        <Messages />
      );
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <VideoPane
        stopStreaming={stopStreaming}
        isCameraOn={isCameraOn}
        setIsCameraOn={setIsCameraOn}
        addPhoto={addPhoto}
        clearPhoto={clearPhoto}
        capturePhoto={capturePhoto}
        img={videoPaneImg}
        canvasRef={canvasRef}
        videoRef={videoRef}
      />
      {getCurrentDisplay()}
      {!isCameraOn && receiver != null && (
        <MessageForm
          initStream={initStream}
          stopStreaming={stopStreaming}
          setIsCameraOn={setIsCameraOn}
          data={data}
          handleFilesPicked={handleFilesPicked}
          handleChange={handleChange}
          handleDoneTyping={handleDoneTyping}
          handleTyping={handleTyping}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
