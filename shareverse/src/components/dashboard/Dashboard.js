import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ServerDetails } from "./ServerDetails";
import {toast} from "react-toastify"
import { ServerAndFileContext } from "../../context/ServerAndFileContext";
import { useContext, useLayoutEffect } from "react";
import { FileContainer } from "../files/FileContainer";

export const Dashboard = () => {

    const currentServer = useSelector((state) => state.currentServer.value);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const {serverOrFile, setServerOrFile} = useContext(ServerAndFileContext);

    if(!user){
        toast.info("Please login first!");
        navigate("/login");
    }
    useLayoutEffect(() => {
        setServerOrFile("server");
    }, [])

    return (
        <div className="dashboard">
            <div className="blue-background">
                <div className="user-info">
                    <h3>Hi, {user.name}</h3>
                </div>
            </div>
            {
                (serverOrFile === "server") ?
                (<ServerDetails/>)
                :
                (
                    <FileContainer/>
                )
            }
        </div>    
    )
}