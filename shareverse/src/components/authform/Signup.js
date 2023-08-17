import { Link } from "react-router-dom"
import "./Style.css"
import { useState, useEffect } from "react"
import { OtpVerify } from "./OtpVerify"
import { otp } from "../../apiconnector/endPoints"
import { apiConnector } from "../../services/instance"
import { toast } from "react-toastify"
import {Loader} from "../loader/Loader"
import { useDispatch } from "react-redux"
import { setOTP } from "../../slicers/otp"
import { revokeToken, removeUser } from "../../slicers/auth"

const initialState = {
    name: "",
    email:"",
    username: "",
    password: "",
    cnfpassword:""
}

export const Signup = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const [showOtp, setShowOtp] = useState(false);

    // remove all token and user from local storage
    useEffect(() => {
        dispatch(revokeToken())
        dispatch(removeUser())
    }, []);

    function inputChangeHandler(event){
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]:event.target.value,
            }
        })
    }


    async function submitHandler(event){
        event.preventDefault();
        
        if(formData.email === ""){
            toast.warn("Please enter your email")
            return;
        }
        
        if(formData.username === ""){
            toast.warn("Please enter username");
            return;
        }

        if(!/^[a-zA-Z]+([0-9]+)?$/.test(formData.username)){
            toast.info("Username must be character followed by numbers");
            return;
        }
        
        if(formData.name === ""){
            toast.warn("Please enter your name");
            return;
        }

        if(formData.password !== formData.cnfpassword){
            toast.warn("Confirm password ditn't match!");
            return;
        }

        setLoading(true);
        try{
            const response = await apiConnector(otp.SEND_OTP, "POST",{email: formData.email});
            if(response.status === 200){
                dispatch(setOTP(response.data.otp));
                setShowOtp(true);
                toast.success("OTP send successfully");
            }else{
                toast.error("Unable to send OTP, Please try again!")
            }
        }catch(err){
            toast.error("Internal server error!");
            console.log("Error while sending OTP while signing up: ", err);
        }
        setLoading(false);
    }

    return (
        <div id="signup">
            {
                showOtp ? 
                (
                    showOtp && 
                    <OtpVerify 
                        data={formData}
                        setShowOtp={setShowOtp}
                    />
                )
            :
            <form className="form-container" onSubmit={submitHandler}>
                <div className="form-header">
                    <h2>Sign Up for ShareVerse</h2>
                </div>

                <div className="form-body">
                    <div className="input-control">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="sharevers@email.com"
                            value={formData.email}
                            onChange={inputChangeHandler}
                            >
                        </input>
                    </div>
                    <div className="input-control">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="shareverse12"
                            value={formData.username}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    <div className="input-control">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="john Don"
                            value={formData.name}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    <div className="input-control">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="............"
                            value={formData.password}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    <div className="input-control">
                        <label htmlFor="cnfpassword">Confirm Password</label>
                        <input 
                            type="password" 
                            name="cnfpassword" 
                            id="cnfpassword" 
                            placeholder="............"
                            value={formData.cnfpassword}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>

                    <div className="input-control">
                        <button type="submit">Sign Up</button>
                    </div>
                </div>
                <div className="form-footer">
                    <div className="external-form-link text-center">
                        <p style={{color:"var(--primary-dark)", cursor:"default"}}>Already a ShareVerse member? <Link className = "external-link" to="/login">Login</Link></p>
                    </div>
                </div>
            </form>
        }  

        {
            loading && <Loader/>
        }
        
        </div>
    )

}