import { func, number, object, oneOf, oneOfType, string } from 'prop-types';
import React from 'react';
import styles from './TextField.module.css';

TextField.propTypes = {
  type: string,
  name: string,
  id: oneOfType([string, number]),
  placeholder: string,
  style: object,
  className: string,
  onChange: func,
  value: string,
  defaultValue: string,
  variant: oneOf(['line', 'rounded']),
};

export default function TextField({
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
}) {
  const variantMap = {
    rounded: styles.rounded,
    line: styles.line,
  };

  return (
    <input
      id={id}
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
