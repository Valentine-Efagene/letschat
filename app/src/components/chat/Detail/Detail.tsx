import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import Header from '../../messages/Header/Header';
import MessageForm from '../forms/Message';
import Messages from '../lists/Messages/Messages';
import styles from './Detail.module.css';
import { sendMessageThunk } from '../../../redux/message/message.slice';
import socket from '../../../services/socket';
import FilesSection from '../forms/FilesSection/FilesSection';
import VideoPane from '../VideoPane';
import { IMessage } from '../../../types/message';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

export default function Detail() {
  const dispatch = useAppDispatch();
  const { setToastState } = useContext(ToastContext);
  const { user } = useAppSelector(state => state.user);
  const { target: receiver } = useAppSelector(state => state.message);

  const initialData: IMessage = {
    text: '',
    files: null,
    receiver: receiver ?? '',
    sender: user?.id ?? '',
  };

  const [data, setData] = useState<IMessage>(initialData);
  const [cameraState, setCameraState] = useState({
    on: false,
    mode: 'photo',
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    facingMode: 'environment', // user
  });
  const [videoPaneImg, setVideoPaneImg] = useState<string | URL | null>();
  const [cameraStream, setCameraStream] = useState<MediaStream | null>();

  let { on: isCameraOn } = cameraState;

  const setIsCameraOn = (val: boolean) => {
    setCameraState(prevState => ({ ...prevState, on: val }));
  };

  const setCameraMode = (mode: string) => {
    setCameraState(prevState => ({ ...prevState, mode }));
  };

  const resetData = () => {
    setData(initialData);
  };

  useEffect(() => {
    resetData();
  }, [receiver]);

  const handleChange: ChangeEventHandler = e => {
    const {
      target: { name, value },
    } = e as ChangeEvent<HTMLInputElement>;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleTyping = () => {
    socket?.emit('typing', { receiver, sender: user?.id });
  };

  const handleDoneTyping = () => {
    socket?.emit('done-typing', { receiver, sender: user?.id });
  };

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();

    try {
      await dispatch(sendMessageThunk({ ...data, sender: user?.id, receiver }));
      setData(initialData);
    } catch (error: any) {
      setToastState!(prevState => {
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
  const handleFilesPicked = (ref: RefObject<HTMLInputElement>) => {
    handleChange({
      target: { name: 'files', value: ref.current?.files },
    } as unknown as ChangeEvent);
  };

  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  /**
   * Release the camera
   *
   * @returns
   */
  const stopStreaming = () => {
    if (cameraStream == null) return;

    const video = videoRef.current as unknown as HTMLVideoElement;
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
    const video = videoRef?.current as HTMLVideoElement;

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
    const canvas = canvasRef?.current as HTMLCanvasElement;

    if (canvas == null) return;

    const video = videoRef?.current;

    canvas.width = screen.width;
    canvas.height = screen.height;

    const ctx = canvas.getContext('2d');

    if (ctx == null) return;

    ctx.drawImage(video!, 0, 0, canvas.width, canvas.height);
    setVideoPaneImg(canvas.toDataURL('image/png'));
  };

  /**
   * Save photo
   */
  const addPhoto = () => {
    if (videoPaneImg == null) return;

    fetch(videoPaneImg)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'capture.png', { type: blob.type });

        if (data?.files == null) {
          handleChange({
            target: { name: 'files', value: [file] },
          } as unknown as ChangeEvent);
        } else {
          handleChange({
            target: {
              name: 'files',
              value: [...data.files, file],
            },
          } as unknown as ChangeEvent);
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
