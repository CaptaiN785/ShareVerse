import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ForgotPassword.css"
import { apiConnector } from "../../services/instance"
import { otp, user } from "../../apiconnector/endPoints"
import { useDispatch, useSelector } from "react-redux"
import { setOTP } from "../../slicers/otp"
import { toast } from "react-toastify"
import { Loader } from "../loader/Loader"
const initialState = {
    email: "",
    password: "",
    cnfpassword: "",
    otp: ""
}

export const ForgotPassword = () => {


    const [formData, setFormData] = useState(initialState);
    const [emailVerified, setEmailVerified] = useState(false);
    const [showResendOtp, setShowResendOtp] = useState(false);
    const [optSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const otpRes = useSelector((state) => state.otp.value);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function submitHandler(event){
        event.preventDefault();

        if(!emailVerified) return;

        if(formData.password === ""){
            toast.error("Please enter password")
            return;
        }

        if(formData.password !== formData.cnfpassword){
            toast.warn("Password didn't match!");
            return;
        }

        setLoading(true);
        try{
        
            const response = await apiConnector(
                    user.CHANGE_PASSWORD,
                    "POST",
                    {
                        email:formData.email,
                        password: formData.password,
                    }
                )
            
            if(response.status === 200){
                toast.success("Password changed successfully");
                navigate("/login");
            }else{
                toast.error("Unable to change password!");   
            }
        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Invalid information")
            }else{
                toast.error("Internal server error")
            }
        }
        setLoading(false);
    }
    
    async function sendOTP(){
        setLoading(true);
        try{
            const response = await apiConnector(
                otp.SEND_OTP, 
                "POST",
                {email: formData.email},
                null,
                {
                    reset: 1
                }
            );
            if(response.status === 200){
                dispatch(setOTP(response.data.otp));
                setOtpSent(true);
                makeResendWait()
                toast.success("OTP sent successfully");
            }else{
                toast.error("Unable to send OTP, Please try again!")
            }
        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Invalid email id")
            }else{
                toast.error("Internal server error!");
            }
            // console.log("Error while sending OTP while signing up: ", err);
        }
        setLoading(false);
    }

    async function resendOtp(){
        setLoading(true);
        try{
            const resendOTPResponse = await apiConnector(
                    otp.RESEND_OTP, 
                    "POST", 
                    {otpId: otpRes._id, email: otpRes.email}
                );
            
            if(resendOTPResponse.status === 200){
                dispatch(setOTP(resendOTPResponse.data.otp));
                toast.warn("OTP resent successfully");
                makeResendWait();
            }
        }catch(err){
            console.log(err);
            if(err?.response?.data?.message){
                toast.error(err?.response?.data?.message);
            }else{
                toast.error("Internal server error!")
            }
        }
        setLoading(false);
    }

    async function verifyOTP(){

        if(formData.otp.length !== 6){
            toast.warn("Please enter 6-digit OTP");
            return;
        }

        setLoading(true);
        try{
            const response = await apiConnector(
                otp.VERIFY_OTP,
                "POST", 
                {otpId: otpRes._id, otp:formData.otp}
                );
            if(response.status === 200){
                toast.success("OTP verified successfully"); 
                setEmailVerified(true);
            }else{
                toast.error("Unable to verify email.");
            }
        }catch(err){
            if(err?.response?.data?.message){
                toast.error(err?.response?.data?.message);
            }else{
                toast.error("Internal server error");
            }
        }
        setLoading(false);
    }

    function makeResendWait(){
        setTimeout(() => {
            setShowResendOtp(true);    
        }, 30 * 1000)
    }
    function inputChangeHandler(event){
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]:event.target.value,
            }
        })
    }

    return (
        <div className="forgot-password-container">

            <div className="form-wrapper">

            <form className="form-container" onSubmit={submitHandler}>
                <div className="form-header">
                    <h2>Reset password</h2>
                </div>

                <div className="form-body">
                    <div className="input-control">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            disabled={emailVerified}
                            placeholder="youremail@mail.com"
                            value={formData.email}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    {
                        !emailVerified && showResendOtp && 
                        <div className="link-btn">
                            <button onClick={resendOtp} type="button">Resend OTP</button>
                        </div>
                    }
                    {
                        !optSent ? (
                            <div className="input-control">
                                <button onClick={sendOTP} type="button">Send OTP</button>
                            </div>
                        )
                        :
                        (
                        !emailVerified &&
                        <div>
                            <div className="input-control">
                                <label htmlFor="otp">Enter OTP</label>
                                <input 
                                    type="text" 
                                    name="otp" 
                                    id="otp" 
                                    placeholder="......"
                                    minLength={6}
                                    maxLength={6}
                                    value={formData.otp}
                                    onChange={inputChangeHandler}
                                ></input>
                            </div>
                            <div className="input-control">
                                <button onClick={verifyOTP} type="button">Verify OTP</button>
                            </div>
                        </div>
                        )
                    }
                    {
                        emailVerified &&
                        (
                        <div>
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
                                <button type="submit">Reset</button>
                            </div>

                        </div>
                        )
                    }
                </div>
                <div className="form-footer">
                    <div className="external-form-link">
                        <p><span style={{color:"var(--primary-dark)", cursor:"default"}}>Recalled your password? </span><Link to="/login" className="external-link">Login</Link></p>
                    </div>
                </div>
            </form>

            </div>
            {
                loading && <Loader/>
            }
        </div>    
    )
}