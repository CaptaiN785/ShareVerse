import { useState, useContext } from "react"
import "./ServerModal.css"
import { useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs"
import {toast} from "react-toastify"
import {Loader} from "../loader/Loader"
import { useNavigate } from "react-router-dom";
import { server } from "../../apiconnector/endPoints";
import { apiConnector } from "../../services/instance";
import { ServerAndFileContext } from "../../context/ServerAndFileContext";

export const ServerInputModal = ({setServerInputModal}) => {

    const token = useSelector((state) => state.auth.token);
    const serversDetail = useSelector((state) => state.servers.detail);
    const [serverName, setServerName] = useState("");
    const [loading, setLoading] = useState(false);
    const {setRefreshServer} = useContext(ServerAndFileContext);
    const navigate = useNavigate()


    async function createServer(event){
        event.preventDefault();
        
        if(serverName === ""){
            toast.info("Please enter server name");
            return;
        }

        // check if name is same as previous
        serversDetail.forEach(detail => {
            if(detail.name.toLowerCase() === serverName.toLowerCase()){
                toast.warn("Server name is already present");
                return;
            }
        })

        setLoading(true);

        try{
            
            const response = await apiConnector(
                server.CREATE, 
                "POST", 
                {name:serverName},
                {"Authorization": "Bearer " + token}
                );
            
            if(response.status === 200){
                toast.success("Server created successfully");
                setRefreshServer((prev) => {return !prev});
            }else{
                toast.error("Unable to create server.");
            }

        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Please login first");
                navigate("/login");
            }else{
                toast.error("Internal server error");
            }
        }
        goBack();
        setLoading(false);
    }


    function inputChangeHandler(event){
        setServerName(event.target.value);
    }

    function goBack(){
        setServerInputModal(false);
    }

    return (
        <div className="create-server">
            <form className="form-container" onSubmit={createServer}>
                <div className="form-header">
                    <h2>Create a Server</h2>
                </div>
                <div className="form-body">
                    <div className="input-control">
                        <label htmlFor="name">Server name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="shareverse"
                            value={serverName}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    <div className="input-control">
                        <button type="submit">Create Server</button>
                    </div>
                </div>
                <div className="form-footer">
                    <div className="external-form-link">
                    <div className="link-btn text-center">
                        <button onClick={goBack} className="vertical-center" style={{marginInline:"auto"}}> 
                            <span><BsArrowLeft className="icon"/></span> 
                            <span>Go Back</span>
                        </button>
                    </div>
                    </div>
                </div>
            </form>
            {
                loading && <Loader/>
            }
        </div>    
    )
}