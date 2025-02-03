import styles from './PostEditPreview.module.css'

import {Link} from 'react-router-dom'
import { useDeleteDocument } from '../hooks/useDeleteDocument'

const stripHtmlTagsAndEntities = (html) => {
    // Remove HTML tags
    let cleanText = html.replace(/<[^>]*>/g, '');
    
    // Replace common HTML entities (e.g., &nbsp;) with a space
    cleanText = cleanText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'); // Add more entities as needed
  
    return cleanText;
  };

const PostEditPreview =({post}) =>{
    const {deleteDocument} =useDeleteDocument("posts") 

    const previewText = stripHtmlTagsAndEntities(post.body).slice(0, 150); // Limit to 150 chars

    return(
        <div className={styles.post_detail}>
            <h2>{post.bookTitle}</h2>
            <h3>{post.author}</h3>
            <div className={styles.row}>
                <img src={post.image} alt={post.tile} />
                <p className={styles.reviewPreview} > {previewText}...</p>
            </div>
            <p  className={styles.createdby}>{post.createdBy}</p>
            <div  className={styles.tags}>
                {post.tagsArray.map((tag)=>(
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                ))
                }
            </div>
            <div className={styles.buttons}>
                <Link to={`/posts/${post.id}`} className="btn btn-outline-secondary"> 👀 View</Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline-secondary">✏️ Edit</Link>
                <button onClick={()=>{deleteDocument(post.id) }}  className="btn btn-outline-secondary"> 🗑️ Delete</button>
            </div>
        </div>
    )
}
export default PostEditPreview;