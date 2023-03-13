import {
  bool,
  func,
  number,
  object,
  oneOf,
  oneOfType,
  string,
} from 'prop-types';
import React from 'react';
import styles from './TextArea.module.css';

TextArea.propTypes = {
  type: string,
  name: string,
  id: oneOfType([string, number]),
  placeholder: string,
  style: object,
  className: string,
  onChange: func,
  value: string,
  defaultValue: string,
  variant: oneOf(['rounded']),
  rows: number,
  cols: number,
  onKeyUp: func,
  required: bool,
  onKeyDown: func,
};

export default function TextArea({
  type = 'text',
  name,
  id,
  placeholder,
  style,
  required,
  className,
  onChange,
  value,
  defaultValue,
  variant = 'rounded',
  rows = 10,
  cols,
  onKeyUp,
  onKeyDown,
}) {
  const variantMap = {
    rounded: styles.rounded,
    line: styles.line,
  };

  return (
    <textarea
      required={required}
      rows={rows}
      cols={cols}
      id={id}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      name={name}
      type={type}
      placeholder={placeholder}
      style={style}
      className={`${variantMap[variant]} ${styles.container} ${className}`}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    />
  );
}
