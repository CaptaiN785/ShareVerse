import { useNavigate } from "react-router-dom"
import "./Home.css"
import {AiFillHeart} from "react-icons/ai"
import {BsGithub, BsLinkedin, BsGlobe, BsInstagram} from "react-icons/bs"
import {SiLeetcode, SiHackerrank, SiGeeksforgeeks} from "react-icons/si"


export const Home = () => {

    const navigate = useNavigate();

    return (
        <div id="home">
            <section className="landing-section">
                <img className="background-img" src="/bg.jpg" alt="background"></img>
                <div className="landing-info">
                    <h1>Take your files everywhere, <em>safe</em></h1>
                    <p>Store your any files and access from anywhere</p>

                    <div className="landing-btn">
                        <button onClick={() => {navigate("/signup")}}>Get Started</button>
                    </div>
                </div>
            </section>

            <section className="home-intro">
                <h2>Introduction</h2>
                <div>
                    Introducing ShareVerse, a cutting-edge file storage solution that 
                    empowers users with seamless document management and storage capabilities. 
                    Built on the robust foundation of Google Firebase and MongoDB 
                    as storage clouds, our platform offers 
                    a host of features designed to make file management effortless and flexible.
                </div>
            </section>

            <section className="home-features">
                <h2>Key Features</h2>
                <div className="feature-collection">
                    <div className="feature-card">
                        <h4>Easy Server Creation</h4>
                        <p>
                        With ShareVerse, users can effortlessly create multiple servers to organize their files efficiently. The intuitive interface allows users to set up dedicated spaces for specific projects, departments, or personal use, enhancing file organization and access
                        </p>
                    </div>
                    <div className="feature-card">
                        <h4>Universal Document Upload</h4>
                        <p>
                        Our platform provides users with the freedom to upload various types of documents, from text files and images to videos and presentations. This versatility ensures that users can store all their important content in one centralized location.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h4>Effortless Deletion</h4>
                        <p>
                        Managing your stored content is a breeze with ShareVerse. Users can easily delete documents/servers they no longer need, freeing up space and maintaining a clutter-free environment.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h4>Google Firebase and MongoDB Integration</h4>
                        <p>
                        Leveraging the power of Google Firebase and MongoDB as storage clouds, our platform ensures reliability, scalability, and security. 
                        </p>
                    </div>
                </div>
            </section>

            <footer className="footer-section">
                <div className="footer-info">
                    <p>
                        <span>Made with <AiFillHeart className="heart"/></span> 
                        <span>by </span> 
                        <span>Mukesh Kumar Thakur</span>
                    </p>
                </div>
                <div className="footer-social-links">
                    <a href="http://captain785.github.io/" target="_blank" title="Portfolio"> <BsGlobe/> </a>
                    <a href="https://github.com/captaiN785/" target="_blank" title="Github" > <BsGithub/> </a>
                    <a href="https://linkedin.com/in/captain785" target="_blank" title="LinkedIn" > <BsLinkedin/> </a>
                    <a href="https://leetcode.com/captain785/" target="_blank" title="Leetcode" > <SiLeetcode/> </a>
                    <a href="https://auth.geeksforgeeks.org/user/captain785" target="_blank" title="GeeksForGeeks" > <SiGeeksforgeeks/> </a>
                    <a href="https://www.hackerrank.com/captain785" target="_blank" title="Hackerrank" > <SiHackerrank/> </a>
                    <a href="https://www.instagram.com/__captain785__/" target="_blank" title="Instagram" > <BsInstagram/> </a>
                </div>
            </footer>
        </div>        
    )
}