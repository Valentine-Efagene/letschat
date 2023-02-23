import React from "react";
import styles from "./MobileChat.module.css";

export default function MobileChat() {
  return (
    <div className={styles.container}>
      <div className={styles.master}></div>
      <div className={styles.detail}></div>
    </div>
  );
}
