import React, { useState } from 'react'
import styles from './ChatWindow.module.css'

export default function ChatWindow() {

    let [ messages, setMessages ] = useState([])
    let [ input, setInput ] = useState("")
  
    let sendMessage = async () => {
      // if no input, do nothing
      if (!input.trim()) return
  
      let userMessage = { role: 'user', content: input }
      setMessages((prev) => [...prev, userMessage])
  
      // clear input field
      setInput("")
  
      try {
        const response = await fetch ("/api/chat", {
          method: POST,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messages: [...messages, userMessage]})
        })
  
        const data = await response.json();
        const aiMessage = { role: "assistance", content: data.reply}
        setMessages((prev)=>[...prev, aiMessage])
      }
      catch (error) {
        console.error(`Error sending message: ${error}`)
      }
    }
  
    return (
        <div className={styles.chat_container}>
            <div className={styles.messages}>
            {messages.map((msg, index) => (
                <div key={index} className={msg.role === "user" ? styles.user : styles.assistant}>
                    <strong>{msg.role === "user" ? "You: " : "AI: "}</strong>
                    {msg.content}
                </div>
            ))}
            </div>
            <div className={styles.input_container}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
