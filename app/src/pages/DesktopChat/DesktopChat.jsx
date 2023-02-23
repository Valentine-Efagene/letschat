import React from "react";
import Master from "../../components/chat/Master/Master";
import styles from "./DesktopChat.module.css";

export default function DesktopChat() {
  return (
    <div className={styles.container}>
      <div className={styles.master}><Master/></div>
      <div className={styles.detail}></div>
    </div>
  );
}
