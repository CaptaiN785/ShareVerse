import { Link, useNavigate } from "react-router-dom"
import "./Style.css"
import { useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "../loader/Loader"
import { apiConnector } from "../../services/instance"
import { user } from "../../apiconnector/endPoints"
import { useDispatch } from "react-redux"
import { setUser, setToken } from "../../slicers/auth"

const initialState = {
    username: "",
    password: "",
}

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)
    const [loading, setLoading] = useState(false);

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
        
        if(formData.username === ""){
            toast.warn("Please enter username");
            return;
        }

        if(!/^[a-zA-Z]+([0-9]+)?$/.test(formData.username)){
            toast.info("Username must be character followed by numbers");
            return;
        }
        
        setLoading(true);

        try{
        
            // make api call
            // save the response in local storage as well as in store.
            const loginResponse = await apiConnector(user.LOGIN, "POST", formData);

            if(loginResponse.status === 200){
                localStorage.setItem("token", loginResponse.data.token);
                localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
                dispatch(setToken(loginResponse.data.token));
                dispatch(setUser(loginResponse.data.user));
                navigate('/dashboard')
            }else{
                toast.error("Unable to login, Please try again!")
            }
        }catch(err){
            if(err?.response?.data?.message){
                toast.error(err?.response?.data?.message);
            }else{
                toast.error("Internal Server Error")
            }
            console.log(err);
        }
        setLoading(false);
    }

    return (
        <div id="login">
            <form className="form-container" onSubmit={submitHandler}>
                <div className="form-header">
                    <h2>Login for ShareVerse</h2>
                </div>

                <div className="form-body">
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
                        <button type="submit">Login</button>
                    </div>
                </div>
                <div className="form-footer">
                    <div className="external-form-link">
                        <p><Link to="/forgot-password" className="external-link">Forgot Password?</Link></p>
                        <p style={{color:"var(--primary-dark)", cursor:"default"}}>New to ShareVerse? <Link className = "external-link" to="/signup">Signup</Link></p>
                    </div>
                </div>
            </form>
            {
                loading && <Loader/>
            }
        </div>    
    )

}