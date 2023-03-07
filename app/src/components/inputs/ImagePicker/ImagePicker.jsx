import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bool, func, object, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { useRef } from 'react';
import styles from './ImagePicker.module.css';

ImagePicker.propTypes = {
  defaultValue: string,
  value: oneOfType([
    shape({
      name: string,
    }),
    string,
  ]),
  onChange: func,
  className: string,
  disabled: bool,
  style: object,
};

export default function ImagePicker({
  defaultValue,
  value,
  onChange,
  className,
  style,
  disabled = false,
}) {
  const getImage = () => {
    if (value?.name) {
      return URL.createObjectURL(value);
    }

    if (value) {
      return value;
    }

    return defaultValue;
  };

  const avatarInputRef = useRef();
  const _style = {
    ...style,
    backgroundImage: `url(${getImage()})`,
  };

  return (
    <label
      htmlFor="avatar"
      className={`${className} ${styles.container}`}
      style={_style}>
      <FontAwesomeIcon icon={faCamera} className={styles.icon} />
      <input
        disabled={disabled}
        ref={avatarInputRef}
        hidden
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={() => {
          onChange(avatarInputRef);
        }}
      />
    </label>
  );
}
