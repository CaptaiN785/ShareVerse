import { useDispatch, useSelector } from "react-redux"
import {HiPlus} from "react-icons/hi"
import { useContext, useEffect, useState } from "react";
import { ServerInputModal } from "./ServerInputModal";
import { apiConnector } from "../../services/instance";
import { server } from "../../apiconnector/endPoints";
import { setServersDetail } from "../../slicers/servers";
import { Loader } from "../loader/Loader";
import { ServerCard } from "./ServerCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ServerAndFileContext } from "../../context/ServerAndFileContext";

export const ServerDetails = () => {

    const serversDetail = useSelector((state) => state.servers.detail);
    const [serverInputMoal, setServerInputModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {refreshServer} = useContext(ServerAndFileContext);
    // put refresh in all the way
    function showServerModal(){
        setServerInputModal(true);
    }

    async function fetchServerDetails(){
        setLoading(true);
        try{
            const serverDetailResponse = await apiConnector(
                server.GET, 
                "POST", 
                null, 
                {"Authorization": "Bearer " + token}, 
                null);

            if(serverDetailResponse.status === 200){
                dispatch(setServersDetail(serverDetailResponse.data.servers));
            }else{
                toast.error("Unable to fetch servers");
            }
        }catch(err){
            console.log(err);
            if(err?.response?.status === 403){
                toast.error("Please login again!");
                navigate("/login")
            }else{
                toast.error("Internal server error!");
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        // load all servers of toke stored
        fetchServerDetails()
    },[refreshServer])

    return (
        <div className="server-wrapper">
            <div className="server-collection">
                {
                    serverInputMoal && 
                    <ServerInputModal
                        setServerInputModal={setServerInputModal}
                    />
                }
                <div className="server-card first-card" onClick={showServerModal}>
                    <p><HiPlus/></p>
                    <p>Create Server</p>
                </div>
                {
                    serversDetail?.map(serverDetail =>  
                    {return <ServerCard key={serverDetail._id} serverData={serverDetail}/>})
                }
                {
                    loading && <Loader/>
                }
            </div>
            </div>
    )
}