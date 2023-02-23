import React from 'react'
import styles from './NavLink.module.css'

export default function NavLink({ url, active, children }) {
    return (
        <a href={url} className={`${active?styles.active:null} ${styles.container}`}>{children}<hr/></a>
    )
}
