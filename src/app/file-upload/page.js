"use client"

import React, { useState, useCallback } from 'react'
import styles from './page.module.css'

export default function FileUpload() {

    let [ formValues, setFormValues ] = useState({
        api_key: '',
    })
    let [ file, setFile ] = useState (null)
    let [ message, setMessage ] = useState('')

    let handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (!formValues.api_key || !file) {
            setMessage('Form requires an api key and a file')
            return
        }
        try {
            const submitData = new FormData()
            submitData.append('file', file)
            submitData.append('api_key', formValues.api_key)
            setMessage('submitting file to Writer 🤙 please hold')
            const response = await fetch("/api/file-handling", {
                method: "POST",
                body: submitData
            });
            const data = await response.json();
            console.log(data)
            setMessage('')
        }
        catch (error) {
            setMessage('server error 😬 please try again')
            console.log('error', error)
        }
    }, [formValues, file])

    let changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    let handleFileChange = e => {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    let uploadFile = () => {
        return ''
    }

  return (
    <div className={styles.container}>
        <div>Upload a File</div>
        <form
            onSubmit={handleSubmit}
            className={styles.form}
            autoComplete="off"  
        >
            <div className={styles.form_item}>
                <label>API Key</label>
                <input className={styles.input} name="api_key" value={formValues.api_key} placeholder="your_writer_api_key_12345" onChange={changeHandler}></input>
            </div>
            <div className={styles.form_item}>
                <label>Add File to Upload</label>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div className={styles.form_item}>
            </div>
            <button>submit file to writer</button>
        </form>
        <div>{message}</div>
    </div>
  )
}
