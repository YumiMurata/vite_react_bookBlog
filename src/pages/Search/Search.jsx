//style
import styles from "./Search.module.css"

//hooks
import {useFetchDocuments} from "../../hooks/useFetchDocuments";
import {useQuery} from "../../hooks/useQuery";
import PostDetail from '../../components/PostDetail';
import {Link} from "react-router-dom";

const Search = () => {

    const query = useQuery()
    const search = query.get('q')

    const {documents:posts} = useFetchDocuments("posts",search);
  return (
    <div className={styles.search}>
        <h2>Search</h2>
        <p>Searched tags:{search}</p>
        <div className={styles.search_results}>
            {posts && posts.map((post) => <PostDetail key={post.id} post={post}/>)}
            {posts && posts.length === 0 &&(<p>There is no book review with the searched tag</p>)}
        </div>
    </div>
  )
}

export default Search