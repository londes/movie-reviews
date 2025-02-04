import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.nav_header}><Link to='/'><h2>AI Review</h2></Link></div>
      <div className={styles.nav_header}><Link to='/movie-chat'><h2>Chat Movies</h2></Link></div>
      <div className={styles.nav_header}><Link to='/writer-app'><h2>Writer App</h2></Link></div>
    </div>
  )
}
