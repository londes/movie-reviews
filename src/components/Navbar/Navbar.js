"use client"

import React from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.nav_header}><Link href='/'><h2>Movie Reviews</h2></Link></div>
      <div className={styles.nav_header}><Link href='/script-chat'><h2>Scripts Chat</h2></Link></div>
      <div className={styles.nav_header}><Link href='/app-embed'><h2>App Embed</h2></Link></div>
    </div>
  )
}
