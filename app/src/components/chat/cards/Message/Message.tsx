import React, { useEffect, useRef, MouseEventHandler, RefObject } from 'react';
import styles from './Message.module.css';

import { IMessage } from '../../../../types/message';
import { FaFile } from 'react-icons/fa';
import { byteFormatter } from '../../../../helpers/formatters';
import { useAppSelector } from '../../../../redux/hooks';

interface IMessageProps {
  message: IMessage;
  isLastMessage: boolean;
  isFirstMessage: boolean;
}

export default function Message({ message, isLastMessage }: IMessageProps) {
  const { user } = useAppSelector(state => state.user);
  const { text, sender, files } = message;

  useEffect;

  useEffect(() => {
    const timeout: any = setTimeout(() => {
      if (isLastMessage) {
        // 👇️ scroll to bottom every time messages change
        if (ref?.current) {
          (ref.current as HTMLElement)
            .scrollIntoView
            //{ behavior: 'smooth' }
            ();
        }
      }

      return clearTimeout(timeout);
    }, 100);
  }, []);

  const ref = useRef<HTMLDivElement>();

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`${user?.id === sender ? styles.sender : styles.receiver} ${
        styles.container
      }`}>
      <p>{text ?? ''}</p>
      {Array.isArray(files) && (
        <div className={styles.files}>
          {text != null &&
            text?.length > 0 &&
            files != null &&
            files?.length > 0 && <hr />}
          {files?.map(file => {
            const { path, mimeType, size, id } = file;

            return (
              <a
                className={styles.fileWrapper}
                key={id}
                href={path}
                target="_blank"
                rel="noreferrer">
                {mimeType === 'application/pdf' && (
                  <FaFile size="10x" color="cadetblue" />
                )}
                {mimeType.split('/').includes('image') && (
                  <img src={path} alt="" />
                )}
                <div className={styles.size}>{byteFormatter.format(size)}</div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
