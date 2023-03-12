import { func, node, object, oneOf, string } from 'prop-types';
import React from 'react';
import styles from './Button.module.css';

Button.propTypes = {
  type: string,
  style: object,
  className: string,
  onClick: func,
  iconLeft: node,
  iconRight: node,
  children: node,
  variant: oneOf(['outline', 'primary', 'light', 'round']),
};

export default function Button({
  type = 'text',
  variant = 'primary',
  style,
  className,
  onClick,
  iconLeft,
  iconRight,
  children,
}) {
  const variantStyle = {
    primary: styles.primary,
    outline: styles.outline,
    light: styles.light,
    round: styles.round,
  };

  return (
    <button
      name={name}
      type={type}
      style={style}
      className={`${variant ? variantStyle[variant] : null} ${
        styles.container
      } ${className}`}
      onClick={onClick}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
