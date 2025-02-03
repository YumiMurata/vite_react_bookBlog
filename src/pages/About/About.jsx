import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.aboutBox}>
        <h1 className={styles.whiteText}>About</h1>
        <p >This project is a blog built with <b>React</b> on the front-end and <b>Firebase</b></p>
        <p >The 'Book Blog' is designed for creating and sharing book reviews. </p>
        <Link to="/posts/create" className="btn">
          Create Post
        </Link>
    </div>
  )
}

export default About