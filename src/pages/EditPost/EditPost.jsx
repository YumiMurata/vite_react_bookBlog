import styles from "./EditPost.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchSingleDocument } from "../../hooks/useFetchSingleDocument";

import Editable from "../../components/Editable";


const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchSingleDocument("posts", id);
    const { user } = useAuthValue();

    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [formError, setFormError] = useState("");

    const { updateDocument, response } = useUpdateDocument("posts");
    const navigate = useNavigate();

    const contentRef = useRef(null);
    const bodyRef = useRef(body);

    // Populate the fields when post is available
    useEffect(() => {
        if (post) {
            setBookTitle(post.bookTitle || "");
            setAuthor(post.author || "");
            setImage(post.image || "");
            setBody(post.body || "");
            setTags(post.tagsArray ? post.tagsArray.join(", ") : "");
        }
    }, [post]);



    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        setBody(bodyRef.current);

        // Validate required fields
        if (!bookTitle || !image || !tags || !body) {
            setFormError("Please fill all the fields");
            return;
        }

        // Validate image URL
        try {
            new URL(image);
        } catch (error) {
            setFormError("Please insert a valid URL in the image field.");
            return;
        }

        // Format tags
        const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase());

        const data = {
            bookTitle,
            author,
            image,
            body: bodyRef.current,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        };

        updateDocument(id, data);
        navigate("/dashboard");
    };





    if (!post) {
        return <p>Loading...</p>;
    }

    if (user.uid !== post.uid) {
        return <p>Sorry, you can't edit this post because you are not the author.</p>;
    }

    return (

        <div className={styles.createPost}>
            <form onSubmit={handleSubmit}>
                <h1>Editing Book Review: {post.bookTitle}</h1>
                <p>Edit your book review</p>

                <label>
                    <span>Title</span>
                    <input
                        type="text"
                        required
                        placeholder="Book's title"
                        onChange={(e) => setBookTitle(e.target.value)}
                        value={bookTitle}
                    />
                </label>

                <label>
                    <span>Author</span>
                    <input
                        type="text"
                        required
                        placeholder="Book's Author"
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                    />
                </label>

                <label>
                    <span>Image URL</span>
                    <input
                        type="text"
                        required
                        placeholder="Insert an image URL"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>  

                 


                <label>
                    <span>Tags</span>
                    <input
                        type="text"
                        required
                        placeholder="Write your tags separated by commas"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                
                <Editable 
                    value={body} 
                    onChange={(newBody) => {
                        setBody(newBody); // Update body state
                        bodyRef.current = newBody; // Also update ref
                    }} 
                />                
                {!response.loading && <button className="btn">Update post</button>}
                {response.loading && <button className="btn" disabled>Wait...</button>}
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
                {console.log("BODY NBEING SENT",body)}
            </form>

        </div>

    );
};

export default EditPost;
