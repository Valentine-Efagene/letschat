import React from 'react'
import styles from './NavLink.module.css'
import {NavLink as Link} from 'react-router-dom'

export default function NavLink({ to, active, children }) {
    return (
        <Link to={to} className={`${active?styles.active:null} ${styles.container}`}>{children}<hr/></Link>
    )
}
