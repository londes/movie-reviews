import React, { useState } from 'react'
import styles from './ChatWindow.module.css'

export default function ChatWindow() {

    let [ messages, setMessages ] = useState([])
    let [ input, setInput ] = useState("")
  
    let sendMessage = async (e) => {
      e.preventDefault()
      // if no input, do nothing
      if (!input.trim()) return
  
      let userMessage = { role: 'user', content: input }
      setMessages((prev) => [...prev, userMessage])
  
      // clear input field
      setInput("")
  
      try {
        let response = await fetch ("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messages: [...messages, userMessage]})
        })
  
        let data = await response.json();
        let aiMessage = { role: "assistant", content: data.reply}
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
                    <strong>{msg.role === "user" ? "you: " : "palmyra: "}</strong>
                    {msg.content}
                </div>
            ))}
            </div>
            <form className={styles.input_container} onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button>Send</button>
            </form>
        </div>
    )
}
