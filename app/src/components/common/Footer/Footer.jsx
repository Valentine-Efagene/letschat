import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Footer.module.css";

Footer.propTypes = {
}

export default function Footer({}) {
  return (
  <div className={styles.container}>
    <div className={styles.socials}><FontAwesomeIcon icon="fa-brands fa-react" /></div>
  </div>
  );
}
