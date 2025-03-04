"use client"

import React, { useState } from 'react'
import styles from './page.module.css'

import ChatWindow from '../../components/ChatWindow/ChatWindow'
import GraphExplorer from '../../components/GraphExplorer/GraphExplorer'

export default function ScriptChat() {
  return (
    <div className={styles.chat_container}>
      <p>Palmyra Talks Movie Scripts</p>
      <ChatWindow />
      {/* <GraphExplorer /> */}
    </div>
  )
}

