import React, {useState} from 'react'
import styles from './Review.module.css'
import Writer from 'writer-sdk'

export const Review = () => {

    const client = new Writer({
        apiKey: process.env.NEXT_PUBLIC_WRITER_API_KEY, // This is the default and can be omitted
      });

    let [ formValues, setFormValues ] = useState({
        movie: '',
        rating: 'great, excellent',
        plot: '',
    })

    async function fetchReview() {
        e.preventDefault()
        console.log('in fetch review')
        const response = await client.applications.generateContent('4aeff293-df99-4d7b-af1e-63882ec30b71', {
            inputs: [
              { id: 'Movie Name', value: "Austin Powers" },
              { id: 'Movie Rating', value: "Great, Excellent" },
              { id: 'Plot Summary', value: "A movie about a spy, and his arch nemesis Dr. Evil" },
            ],
          });
        
          console.log(response.suggestion);
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
    </div>
  )
}
