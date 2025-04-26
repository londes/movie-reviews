"use client"

import React, { useState, useCallback } from 'react'
import styles from './page.module.css'

import FileList from '../../components/FileList/FileList'

export default function FileUpload() {

    let [ formValues, setFormValues ] = useState({
        fileName: '',
        apiKey: '',
    })
    let [ file, setFile ] = useState (null)
    let [ message, setMessage ] = useState('')
    // let [ filesMessage, setFilesMessage ] = useState('')

    let handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (!formValues.apiKey || !file) {
            setMessage('Form requires an api key and a file')
            return
        }
        try {
            const submitData = new FormData()
            for (const key in formValues)
                submitData.append(key, formValues[key])
            submitData.append('file', file)
            console.log(submitData)

            setMessage('submitting file to Writer 🤙 please hold')
            const response = await fetch("/api/file-handling", {
                method: 'POST',
                body: submitData
            });
            const data = await response.json();
            setMessage(`successfully uploaded ${data.uploadedFile.name} to Writer with file id: ${data.uploadedFile.id}`)
            console.log(data)
        }
        catch (error) {
            setMessage('server error 😬 please try again')
            console.log('error', error)
        }
    }, [formValues, file])

    let changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
        console.log(formValues)
    }

    let handleFileChange = e => {
        e.preventDefault()
        setFile(e.target.files[0])
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
                <input className={styles.input} name="apiKey" value={formValues.apiKey} placeholder="your_writer_api_key_12345" onChange={changeHandler}/>
            </div>
            <div className={styles.form_item}>
                <label>Add File to Upload</label>
                <input type="file" onChange={handleFileChange}/>
            </div>
            <button>submit file to writer</button>
        </form>
        <div>{message}</div>
        {/* <FileList/> */}
    </div>
  )
}
