"use client"

import React, { useState, useEffect, useCallback } from 'react'
import styles from './page.module.css'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function Review() {

    let [ formValues, setFormValues ] = useState({
        movie: '',
        rating: 'great, excellent',
        plot: '',
    })
    let [ rMdownTest, setrMdownTest] = useState('')
    let [ message, setMessage ] = useState('')

    useEffect(() => {
        console.log('updated markdown: ', rMdownTest);
      }, [rMdownTest]);

    let fetchReview = useCallback(async (e) => {
        e.preventDefault()
        if (!formValues.movie || !formValues.plot) {
            setMessage('Form requires a movie name and a plot synopsis')
            return
        }
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
            setrMdownTest(data.suggestion)
            setMessage('')
        }
        catch (error) {
          setMessage('server error 😬 please try again')
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
                <label>Movie Name</label>
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
                <label className={styles.plot_summary}>Plot Summary
                  <span className={styles.tooltip}>
                    i
                    <span className={styles.tooltip_text}>
                      A summary or synopsis of the movie plot. Try an <a href="https://www.imdb.com/title/tt0118655/plotsummary/?ref_=tt_stry_pl#synopsis">iMDB synopsis</a>
                    </span>
                  </span>
                </label>
                <textarea onChange={changeHandler} name="plot" value={plot}></textarea>
            </div>
            <button>generate a review</button>
        </form>
        <div>{message}</div>
        <div className={styles.output}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{rMdownTest}</ReactMarkdown>
        </div>
    </div>
  )
}