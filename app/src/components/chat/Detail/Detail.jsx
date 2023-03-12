import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  const { user } = useSelector(state => state.user);
  const { status } = useSelector(state => state.message);
  const { id: receiver } = useParams();

  const defaultData = {
    text: '',
    files: null,
    receiver,
    sender: user?.id,
  };

  const { setToastState } = useContext(ToastContext);
  const [data, setData] = useState(defaultData);
  const [isCapturing, setIsCapturing] = useState(false);
  const [videoPaneImg, setVideoPaneImg] = useState();
  const [videoSrc, setVideoSrc] = useState();
  const [cameraStream, setCameraStream] = useState();

  const dispatch = useDispatch();

  const handleChange = e => {
    const {
      target: { name, value },
    } = e;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleTyping = () => {
    socket?.emit('typing', user?.id);
  };

  const handleDoneTyping = () => {
    socket?.emit('done-typing', user?.id);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const message = await dispatch(
        sendMessageThunk({ ...data, sender: user?.id, receiver }),
      ).unwrap();
      socket?.send(message);
      setData(defaultData);
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

  const handleFilesPicked = ref => {
    handleChange({ target: { name: 'files', value: ref.current?.files } });
  };

  const videoRef = useRef();
  const canvasRef = useRef();

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

  const startStreaming = () => {
    setIsCapturing(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
        preferCurrentTab: false,
      })
      .then(stream => {
        setCameraStream(stream);

        if (videoRef?.current == null) return;

        const video = videoRef?.video;
        video.srcObject = stream;

        video.play();
      })
      .catch(error => {
        console.log(`An error occurred: ${error}`);
      });
  };

  // https://codepen.io/bhagwatchouhan/pen/jjLJoB
  const takePhoto = () => {
    setIsCapturing(true);
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

  const capture = () => {
    const canvas = canvasRef?.current;
    const video = videoRef?.current;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setVideoPaneImg(canvas.toDataURL('image/png'));
  };

  const addPhoto = () => {};

  const clearPhoto = () => {
    // const canvas = canvasRef?.current;
    // const ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'AAA';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // const data = canvas.toDataURL('image/png');
    setVideoPaneImg(null);
  };

  const getCurrentDisplay = () => {
    if (isCapturing) {
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
        isCapturing={isCapturing}
        setIsCapturing={setIsCapturing}
        addPhoto={addPhoto}
        clearPhoto={clearPhoto}
        capture={capture}
        img={videoPaneImg}
        canvasRef={canvasRef}
        videoRef={videoRef}
      />
      {getCurrentDisplay()}
      {!isCapturing && (
        <MessageForm
          startStreaming={startStreaming}
          stopStreaming={stopStreaming}
          setIsCapturing={setIsCapturing}
          takePhoto={takePhoto}
          text={data?.text}
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
