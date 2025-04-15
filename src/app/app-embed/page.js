"use client"

import React from 'react'
import styles from './page.module.css'

export default function AppEmbed () {
  return (
    <div className={styles.embed_container}>
      <iframe
        src="https://embed.writer.com/text-generation/GOPLcss5Prts5RZlWaS6hQEGm8qceonLajIoLjeLyvA"
        width="800"
        height="600"
        style={{
          background: 'white',
          borderRadius: '8px',
          border: 'none',
          boxShadow: '5px 5px 24px 0px #0000001F',
        }}>
      </iframe>
      <iframe
        src="https://embed.writer.com/research-assistant/kDsvJEbtXymawT6GCl7Y674KdviyOgPejX3Gz5hZlps" 
        width="800" 
        height="600"
        style={{
          background: 'white',
          borderRadius: '8px',
          border: 'none',
          boxShadow: '5px 5px 24px 0px #0000001F',
        }}>
      </iframe>
      <iframe 
        src="https://embed.writer.com/chat/l67qc7eYDzUj7aUhgiUlDxj9cQ_wCHGKllVLeSh6gVg" 
        width="800" 
        height="600"
        style={{
          background: 'white',
          borderRadius: '8px',
          border: 'none',
          boxShadow: '5px 5px 24px 0px #0000001F',
        }}></iframe>
    </div>
  )
}

//"background: white;border-radius: 8px; border: none; box-shadow: 5px 5px 24px 0px #0000001F;" src="https://embed.writer.com/text-generation/GOPLcss5Prts5RZlWaS6hQEGm8qceonLajIoLjeLyvA" 