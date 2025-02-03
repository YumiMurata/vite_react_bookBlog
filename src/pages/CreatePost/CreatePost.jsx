import styles from "./CreatePost.module.css";
import {useState, useRef} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import Editable from "../../components/Editable";

const CreatePost = () => {
  const [bookTitle,setBookTitle]=useState("")
  const [author,setAuthor]=useState("")
  const[image,setImage]=useState("")
  const[body,setBody]=useState("")
  const[tags,setTags]=useState("")
  const[formError,setFormError]=useState("")

  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()
  const bodyRef = useRef(body);

  const{user} = useAuthValue()

  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormError("")

    //validate image URL
    try{
      new URL (image); //try to create a URL given the string from image field
    }catch(error){
      setFormError("Please insert an URL in the image field.")
    }


    //creating the array of tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (formError)return;

    //checking if all values were inputed
    if (!bookTitle || !image || !tags|| !body){
      setFormError("Please fill all the fields")
    }


    insertDocument({
      bookTitle, 
      image,
      author, 
      body, 
      tagsArray, 
      uid:user.uid, 
      createdBy:user.displayName }) 
      
      //redirect to homepage
      navigate("/home")

  };
  const{createUser,error:authError, loading} = useAuthentication();

  

  return (
    <div className={styles.createPost}>

      <form onSubmit={handleSubmit}>

      <h1>Create a Book Review</h1>
      <p>Write about your thoughts about a book! Share what your learned from it, what you most liked about the book or even you favorite character.</p>
    
        <label>
          <span>Title</span>
          <input 
          type="text" 
          name="booktitle" 
          required 
          placeholder="Book's title" 
          onChange={(e)=>setBookTitle(e.target.value)}
          value={bookTitle}
          />
        </label>

        <label>
          <span>Author</span>
          <input 
          type="text" 
          name="author" 
          required 
          placeholder="Book's Author " 
          onChange={(e)=>setAuthor(e.target.value)}
          value={author}
          />
        </label>
        <label>
          <span>URL</span>
          <input 
          type="text" 
          name="image" 
          required 
          placeholder="Insert an URL of an image that represents your book review" 
          onChange={(e)=>setImage(e.target.value)}
          value={image}
          />
        </label>
        <Editable 
            value={body} 
            onChange={(newBody) => {
                setBody(newBody); // Update body state
                bodyRef.current = newBody; // Also update ref
            }} 
        /> 


        <label>
          <span>Tags</span>
          <input 
          type="text" 
          name="tags" 
          required 
          placeholder="Write your tags, separeted by commas" 
          onChange={(e)=>setTags(e.target.value)}
          value={tags}
          />
        </label>


        {!response.loading && <button className="btn">Post</button>}
        {response.loading && <button className="btn" disabled>Wait...</button>}
        {response.error && <p className="error">{error}</p>} 
        {formError && <p className="error">{formError}</p>} 

      </form>
    </div>
  )
}

export default CreatePost