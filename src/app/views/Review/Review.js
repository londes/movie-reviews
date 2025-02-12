import React, { useState, useEffect, useCallback } from 'react'
import styles from './Review.module.css'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export const Review = () => {

    let [ formValues, setFormValues ] = useState({
        movie: '',
        rating: 'great, excellent',
        plot: '',
    })
    let [ reviewMarkdown, setReviewMarkdown] = useState('')
    let [ message, setMessage ] = useState('')

    useEffect(() => {
        console.log('updated markdown: ', reviewMarkdown);
      }, [reviewMarkdown]);

    let fetchReview = useCallback(async (e) => {
        if (!formValues.movie || !formValues.plot) {
            setMessage('Form requires a movie name and a plot synopsis')
            return
        }
        e.preventDefault()
        try{
            setMessage('Retrieving a review from Palmyra 🤙 please hold')
            const response = await fetch("/api/proxy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues)
            });
            const data = await response.json();
            console.log('api response: ', data)
            setReviewMarkdown(data.suggestion)
            setMessage('')
        }
        catch (error) {
            console.log('error', error)
        }
    }, [formValues])

    let changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    let { movie, plot } = formValues

  return (
    <div className={styles.container}>
        <div>Palmyra Generates Reviews</div>
        <form
            onSubmit={fetchReview}
            className={styles.form}
            autoComplete="off"  
        >
            <div className={styles.form_item}>
                <label >Movie Name</label>
                <input className={styles.input} name="movie" value={movie} placeholder="Austin Powers" onChange={changeHandler}></input>
            </div>
            <div className={styles.form_item}>
                <label>Movie Rating</label>
                <select className={styles.input} onChange={changeHandler} name="rating">
                    <option value="great, excellent">Great, Excellent</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="bad">Bad</option>
                    <option value="terrible">Terrible</option>
                </select>
            </div>
            <div className={styles.form_item}>
                <label>Plot Summary</label>
                <textarea onChange={changeHandler} name="plot" value={plot}></textarea>
            </div>
            <button>generate a review</button>
        </form>
        <div>{message}</div>
        <div className={styles.output}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{reviewMarkdown}</ReactMarkdown>
        </div>
    </div>
  )
}
