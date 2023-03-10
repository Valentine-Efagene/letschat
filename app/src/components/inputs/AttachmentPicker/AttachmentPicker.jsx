import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bool, func, object, shape, string } from 'prop-types';
import React from 'react';
import { useRef } from 'react';
import styles from './AttachmentPicker.module.css';

AttachmentPicker.propTypes = {
  defaultValue: string,
  value: shape({
    name: string,
  }),
  onChange: func,
  className: string,
  disabled: bool,
  style: object,
  name: string,
  id: string,
  multiple: bool,
};

export default function AttachmentPicker({
  onChange,
  className,
  style,
  disabled = false,
  name,
  id,
  multiple,
}) {
  const attachmentRef = useRef();

  return (
    <label
      htmlFor={id}
      className={`${className} ${styles.container}`}
      style={style}>
      <FontAwesomeIcon icon={faPaperclip} className={styles.icon} />
      <input
        multiple={multiple}
        disabled={disabled}
        ref={attachmentRef}
        hidden
        type="file"
        id={id}
        name={name}
        //accept="image/png,image/jpeg"
        accept="*"
        onChange={() => {
          onChange(attachmentRef);
        }}
      />
    </label>
  );
}
