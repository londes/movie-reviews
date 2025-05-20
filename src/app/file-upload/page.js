"use client"

import React, { useState, useCallback } from 'react'
import styles from './page.module.css'
import UploadFile from '../../components/UploadFile/UploadFile'

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
        console.log(formValues.apiKey, file)
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
            setMessage('server error 😬 please try again, and ensure your api key is correct')
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
        {/* todo: implement an accordion dropdown allowing user to select UploadFile or FileList */}
        <UploadFile
            formValues={formValues}
            setFormValues={setFormValues}
            file={file}
            setFile={setFile}
            message={message}
            onSubmit={handleSubmit}
            onChange={changeHandler}
            onFileChange={handleFileChange}
        />
        {/* FileList will hit Writer /files/list endpoint, and allow Download / Delete functionality */}
        {/* <FileList></> */}
    </div>
  )
}
