import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.aboutBox}>
        <h1 className={styles.whiteText}>About</h1>
        <p >This project is built with <b>React</b> and <b>Firebase</b>, created while studying and learning the React framework.</p>
        <p >📚The 'Book Blog' is designed for creating and sharing book reviews. </p>
        <p>Currently being used as a personal tracker for the books that I have been reading 😅 </p>
        <p>
          <b>✅Implemented:</b>
          <ul>
            <li>Search books by tags in Home page</li>
            <li>User registration</li>
            <li>Creation of a post/book review (for logged user)</li>
            <li>Edit post/books review (for logged user)</li>
          </ul>

          <b>❌Not Implemented:</b>
          <ul>
            <li>Search books by multiple tags</li>
            <li>Reset password for users</li>
            <li>Profile page with all posts of user other than yourself</li>
          </ul>

        </p>
    </div>
  )
}

export default About