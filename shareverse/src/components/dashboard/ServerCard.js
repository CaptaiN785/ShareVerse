import {BsTrash} from "react-icons/bs"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/instance";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import { server } from "../../apiconnector/endPoints";
import { useState, useContext, useEffect } from "react";
import { Loader } from "../loader/Loader";
import { setCurrentServer } from "../../slicers/currentServer";
import { ServerAndFileContext } from "../../context/ServerAndFileContext";
import { ConfirmPrompt } from "../prompts/ConfirmPrompt"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const ServerCard = ({serverData}) => {

    const {setRefreshServer} = useContext(ServerAndFileContext);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const {setServerOrFile} = useContext(ServerAndFileContext);
    const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
    const [confirmPromptResult, setConfirmPromptResult] = useState(false);

    const getDate = (serverDate) =>{
        const date = new Date(serverDate).toDateString()
        return date;
    }   
    
    async function deleteServer(){
        setLoading(true);
        try{
            const response = await apiConnector(
                server.DELETE, 
                "POST", 
                {serverId: serverData._id}, 
                {"Authorization": "Bearer " + token}, 
                null);

            if(response.status === 200){
                setRefreshServer((prev) => {return !prev});
                toast.success("Server deleted!")
            }else{
                toast.error("Unable to fetch servers");
            }
        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Please login again!");
                navigate("/login")
            }else{
                toast.error("Internal server error!");
            }
        }
        setLoading(false);
    }

    function showCurrentServer(){
        dispatch(setCurrentServer(serverData));
        setServerOrFile("file");
    }

    useEffect(() => {
        if(confirmPromptResult){
            deleteServer();
        }
    }, [confirmPromptResult])

    function showConfirmation(){
        setShowConfirmPrompt(true);
    }

    return (
        <div>
        <div className="server-card card-info" >
            <button className="delete-btn" onClick={showConfirmation} ><BsTrash/></button>
            <p className="card-item">{serverData.files.length} file{serverData.files.length > 1 && 's'}</p>
            <p className="card-name" onClick={showCurrentServer}>{serverData.name}</p>
            <p className="card-date">Created on: {getDate(serverData.createdat)}</p>
        </div>
        {
            loading && <Loader/>
        }
        {
            showConfirmPrompt && 
            <ConfirmPrompt  
                setConfirmPromptResult={setConfirmPromptResult}
                setShowConfirmPrompt={setShowConfirmPrompt}
            />
        }

        </div> 
    )

}