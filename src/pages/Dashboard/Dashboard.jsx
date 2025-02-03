import styles from "./Dashboard.module.css"

import {Link} from 'react-router-dom';

//components
import PostEditPreview from "../../components/PostEditPreview"

//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const {user} = useAuthValue();
  const uid = user.uid;

  //posts dos usuario
  const{documents:posts, loading }= useFetchDocuments("posts",null,uid)


  if (loading){
    <div>Loading...</div>
  }
  return (
    <div className={styles.myposts}>
      <h1>My reads</h1>
      {posts && posts.length ===0 && (
        <div>
          <p>you don't have any book read yet😔 </p>
          <Link className="btn" to="posts/create">Create your first Book Review</Link>
          <p>{posts.length}</p>
          <p>{uid}</p>
        </div>
      ) }
      
      {posts && posts.map(
              (post)=>{
                return <PostEditPreview key={post.id} post={post}/>
              }
            )}


    </div>

  )
}

export default Dashboard