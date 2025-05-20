import React from 'react'
import styles from './UploadFile.module.css'

export default function UploadFile({ formValues, file, message, onSubmit, onChange, onFileChange}) {
  return (
    <div className={styles.container}>
        <div>Upload a File</div>
        <form
            onSubmit={onSubmit}
            className={styles.form}
            autoComplete="off"  
        >
            <div className={styles.form_item}>
                <label>API Key</label>
                <input className={styles.input} 
                    name="apiKey" 
                    value={formValues.apiKey} 
                    placeholder="your_writer_api_key_12345" 
                    onChange={onChange}/>
            </div>
            <div className={styles.form_item}>
                <label>Add File to Upload</label>
                <input type="file" onChange={onFileChange}/>
            </div>
            <div className={styles.form_item}>
                <label>Desired File Name (optional)</label> 
                {/* todo: add tooltip explaining optional-ness and behavior here */}
                <input className={styles.input} 
                    name="fileName" 
                    value={formValues.fileName} 
                    placeholder="some_file_name.txt" 
                    onChange={onChange}/>
            </div>
            <button>submit file to writer</button>
        </form>
        <div>{message}</div>
    </div>
  )
}
