import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useEffect, useRef, useState } from "react";
import {HiBars3} from "react-icons/hi2"
import {RxCross2} from "react-icons/rx"
// jis server pe jayega us server ka info store karna h

export const Navbar = () => {

    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const linkRef = useRef()
    const [showNav, setShowNav] = useState(true);

    function showHideNavbar(){
        if(showNav){
           linkRef.current.style.left = "0";
           setShowNav(!showNav);  
        }else{
            linkRef.current.style.left = "-100%";
            setShowNav(!showNav); 
        }
    }

    // run on every single change
    useEffect(() => {
        linkRef.current.childNodes.forEach(child => {
            if(child.getAttribute("href") === location.pathname){
                child.classList.add('active-link')
            }else{
                child.classList.remove('active-link')
            }
        })
        linkRef.current.style.left = "-100%";
        setShowNav(true);
    }, [location.pathname])

    return (
        <div className="nav-bar-wrapper">
            <div className="nav-bar">
                <div className="logo">
                    <Link to="/">
                        <p>Share</p>
                        <p>Verse</p>
                    </Link>
                </div>

                {/* if user is present then function key else login and signup*/}
                {
                    user ? 
                    (
                        <div className="nav-link" ref={linkRef}>
                            <Link to="/">Home</Link>
                            <Link to="/dashboard" >Dashboard</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    )
                    :
                    (
                        <div className="nav-link" ref={linkRef}>
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )
                }
                <div className="nav-btn" onClick={showHideNavbar}>
                    <button> 
                    {
                        showNav ? <HiBars3/> : <RxCross2/>
                    } 
                    </button>
                </div>
            </div>
        </div>
    )
}