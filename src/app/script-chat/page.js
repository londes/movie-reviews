"use client"

import React, { useState } from 'react'
import styles from './page.module.css'

import ChatWindow from '../../components/ChatWindow/ChatWindow'

export default function ScriptChat() {
  return (
    <div className={styles.chat_container}>
      <p>Palmyra Talks Movie Scripts</p>
      <ChatWindow />
    </div>
  )
}

