'use client'

import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function Home() {
  return (
    <div className={styles.app}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/'/> {/* this gonna be our web UI using CRUD w writer API */}
          <Route path='/movie-chat'/>
          <Route path='/writer-app'/>
        </Routes>
      </Router>
      <header className={styles.header}>
      </header>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
