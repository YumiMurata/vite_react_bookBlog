import styles from './BookReview.module.css'

//hooks
import {useParams} from 'react-router-dom';
import { useFetchSingleDocument } from '../../hooks/useFetchSingleDocument';
 
const BookReview = () => {
  const{id} = useParams();
  const {document:bookReview}= useFetchSingleDocument("posts", id)
  console.log("HOOK CHAMADO", bookReview,id)
  return (
    <div  className={styles.review}>
      {bookReview &&(
        <div>
            <div className={styles.basicInfo}>
              <img src={bookReview.image} alt="" />
              <div className={styles.reviewInfo}>
                <h2>{bookReview.bookTitle}</h2>
                <p><b>Author:</b>{bookReview.author}</p>
                <p> <b>Review by </b>{bookReview.createdBy}</p>
              </div>

            </div>
           <div dangerouslySetInnerHTML={{ __html: bookReview.body }}></div> 
          <div className={styles.tags}>{bookReview.tagsArray.map((tag)=>(
            <p key={tag}><b> #</b>{tag}</p>
          ))}</div>
      </div>)}

    </div>
  )
}

export default BookReview