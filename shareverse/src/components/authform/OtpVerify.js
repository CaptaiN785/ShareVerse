import { toast } from "react-toastify";
import "./Style.css"
import { useEffect, useState } from "react"
import { apiConnector } from "../../services/instance";
import { otp, user } from "../../apiconnector/endPoints";
import { useNavigate } from "react-router-dom";
import { Loader } from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {setOTP} from "../../slicers/otp"

export const OtpVerify = ({data, setShowOtp}) => {

    const otpRes = useSelector((state) => state.otp.value);
    const dispach = useDispatch();

    const navigate = useNavigate();
    const [otpInput, setOtpInput] = useState("");
    const [showResendOtp, setShowResendOtp] = useState(false);
    const [loading, setLoading] = useState(false);

    function inputChangeHandler(event){
        setOtpInput(event.target.value);
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
                dispach(setOTP(resendOTPResponse.data.otp));
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

    // make wait of 30 sec
    function makeResendWait(){
        setTimeout(() => {
            setShowResendOtp(true);    
        }, 30 * 1000)
    }

    useEffect(() => {
        makeResendWait();
    }, [otpRes])

    function goBack(){
        setShowOtp(false);
    }

    async function submitHandler(event){
        event.preventDefault();

        if(otpInput.length !== 6){
            toast.warn("Please enter 6-digit OTP")
            setLoading(false);
            return;
        }

        setLoading(true);
        try{
            const response = await apiConnector(otp.VERIFY_OTP, "POST", {otpId: otpRes._id, otp:otpInput});
            if(response.status === 200){
                toast.success("OTP verified successfully"); 
                
                // perform signup request
                const signupResponse = await apiConnector(user.SIGNUP, "POST", data);
                if(signupResponse.status === 200){
                    toast.success("User Signup successfully")
                    navigate("/login");
                }
            }
        }catch(err){
            toast.error(err?.response?.data?.message);
        }
        setLoading(false);
    }

    return (
        <div id="otp-verify">
            <form className="form-container" onSubmit={submitHandler}>
                <div className="form-header">
                    <h2>Verify OTP</h2>
                </div>
                <div className="form-body">
                    <div className="input-control">
                        <label htmlFor="otp">Enter OTP</label>
                        <input 
                            type="password" 
                            name="otp" 
                            id="otp" 
                            placeholder="......"
                            value={otpInput}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    {
                        showResendOtp && 
                        <div className="link-btn">
                            <button onClick={resendOtp} type="button">Resend OTP</button>
                        </div>
                    }
                    <div className="input-control">
                        <button type="submit">Verify</button>
                    </div>
                </div>
                <div className="form-footer">
                    <div className="link-btn">
                        <button onClick={goBack} type="button">Go Back</button>
                    </div>
                </div>
            </form>
            {
                loading && <Loader/>
            }
        </div>
    )
}