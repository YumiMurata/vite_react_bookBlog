import styles from './PostDetail.module.css'

import {Link} from 'react-router-dom'

const stripHtmlTagsAndEntities = (html) => {
    // Remove HTML tags
    let cleanText = html.replace(/<[^>]*>/g, '');
    
    // Replace common HTML entities (e.g., &nbsp;) with a space
    cleanText = cleanText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'); // Add more entities as needed
  
    return cleanText;
  };

const PostDetail =({post}) =>{
    const previewText = stripHtmlTagsAndEntities(post.body); // Limit to 150 chars

    return(
        <div className={styles.post_detail}>
            <h2>{post.bookTitle}</h2>
            <h3>{post.author}</h3>
            <div className={styles.row}>
                <img src={post.image} alt={post.tile} />
                <p className={styles.reviewPreview}> {previewText}</p>
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
            <Link to={`/posts/${post.id}`} className="btn btn-outline"> Read the review</Link>
        </div>
    )
}
export default PostDetail;