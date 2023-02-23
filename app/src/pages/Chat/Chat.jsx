import React from "react";
import DesktopChat from "../DesktopChat";
import MobileChat from "../MobileChat/MobileChat";
import styles from "./Chat.module.css";

export default function Chat() {
  return (
    <div className={styles.container}>
      <div className={styles.desktop}><DesktopChat/></div>
      <div className={styles.mobile}><MobileChat/></div>
    </div>
  );
}
