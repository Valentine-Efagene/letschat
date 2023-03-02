import { func, number, object, oneOf, oneOfType, string } from 'prop-types';
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
};

export default function TextArea({
  type = 'text',
  name,
  id,
  placeholder,
  style,
  className,
  onChange,
  value,
  defaultValue,
  variant = 'rounded',
  rows = 10,
  cols,
  onKeyUp,
}) {
  const variantMap = {
    rounded: styles.rounded,
    line: styles.line,
  };

  return (
    <textarea
      rows={rows}
      cols={cols}
      id={id}
      onKeyUp={onKeyUp}
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