import styles from "./Home.module.css";

//hooks
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//context
import { useAuthValue } from "../../context/AuthContext";


//components
import PostDetail from "../../components/PostDetail"

const Home = () => {
  //query state for searching in the database
  const [query, setQuery] = useState("")
  //const[posts,setposts] = useState([])
  const{documents:posts, loading }= useFetchDocuments("posts")
  const navigate = useNavigate()
  const{user} = useAuthValue()
  console.log("USER DATA",user)


  
  
  const handleSubmit = (e)=>{
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }


  return (
    <div className={styles.home}>
        <h1>🔍Search by tags</h1>
        <p className={styles.subtitle}>You can search by genres, tags</p>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input type="text" placeholder="search by tags" onChange={(e)=> setQuery(e.target.value)} />
          <button className="btn btn-dark">Search</button>
        </form>
        <h1>📝Our Latest Book Reviews</h1>
        <div className={styles.allPosts}>
          <div className={styles.post_list}>
            {console.log("POSTS",posts)}
            {posts && posts.map(
              (post)=>{
                return <PostDetail key={post.id} post={post}/>
              }
            )}
            {loading && <p>Loading...</p>}
            {posts && posts.length === 0 &&(
              <div className={styles.noposts}>
                <p>No post found</p>
                <Link className="btn" to="/posts/create">Create first post</Link>
              </div>
            )}
          </div>
        </div>

    </div>
  )
}

export default Home