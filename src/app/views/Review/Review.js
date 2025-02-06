import React, {useState} from 'react'
import styles from './Review.module.css'

export const Review = () => {

    let [ formValues, setFormValues ] = useState({
        movie: '',
        rating: 'great, excellent',
        plot: '',
    })

    let [ reviewMarkdown, setReviewMarkdown] = useState('')

    async function fetchReview(e) {
        e.preventDefault()
        console.log('in fetch review')
        try{
            console.log('trying')
            const response = await fetch("/api/proxy");
            console.log(response)
            const data = await response.json();
            console.log(data)
            console.log(data.suggestion);
            setReviewMarkdown(data.suggestion)
            console.log(reviewMarkdown)
        }
        catch (error) {
            console.log('catching')
            console.log(error)
        }
    }

    let submitHandler = e => {
        e.preventDefault()
        console.log(e)
    }

    let changeHandler = e => {
        setFormValues({...formValues, [e.target.attributes.name.value]: e.target.value})
    }

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
                <input className={styles.input} name="movie" value={formValues.movie} placeholder="Austin Powers" onChange={changeHandler}></input>
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
                <textarea onChange={changeHandler} name="plot" value={formValues.plot}></textarea>
            </div>
            <button>get a review</button>
        </form>
        <div>{reviewMarkdown}</div>
    </div>
  )
}
