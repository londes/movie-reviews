'use client'

import Navbar from "@/components/Navbar/Navbar";
import styles from './page.module.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Review } from "./views/Review/Review";
import { Chat } from "./views/Chat/Chat";
import { Framework } from "./views/Framework/Framework";

export default function Home() {
  return (
    <div className={styles.app}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Review/>}/>
          <Route path='/movie-chat' element={<Chat/>}/>
          <Route path='/writer-app'element={<Framework/>}/>
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
