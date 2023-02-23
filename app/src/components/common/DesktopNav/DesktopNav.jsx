import { faCommenting } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { string } from "prop-types";
import React from "react";
import NavLink from "../NavLink/NavLink";
import styles from "./DesktopNav.module.css";

DesktopNav.propTypes = {
  className: string
}

export default function DesktopNav({className}) {
  return (
  <nav className={`${className} ${styles.container}`}>
    <FontAwesomeIcon icon={faCommenting} size='3x' style={{color: 'cadetblue'}} />
    <div className={styles.navItemsWrapper}>
    <NavLink>
        Home
    </NavLink>
    <NavLink className={styles.navButton}>
        Chat
    </NavLink>
    <NavLink className={styles.navButton}>
        About
    </NavLink>
    </div>
  </nav>
  );
}
