import { useEffect, useState } from "react"
import {revokeToken, removeUser} from "../../slicers/auth"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Loader } from "../loader/Loader"

export const Logout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        dispatch(revokeToken())
        dispatch(removeUser())
        navigate("/");
        setLoading(false);
    }, [])

    return (
        <div>
            {
                loading && <Loader/>
            }
        </div>    
    )
}