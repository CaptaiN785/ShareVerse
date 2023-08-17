import {useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/instance";
import { fileEndPoint } from "../../apiconnector/endPoints";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "../loader/Loader";
import { File } from "./File";
import { ServerAndFileContext } from "../../context/ServerAndFileContext";

export const Files = () => {

    const currentServer = useSelector((state) => state.currentServer.value);
    const token = useSelector((state) => state.auth.token);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    
    const {refreshFiles} = useContext(ServerAndFileContext);

    async function fetchFiles(){
        setLoading(true);
        try{
            const response = await apiConnector(
                    fileEndPoint.GET,
                    "POST",
                    {serverId: currentServer._id},
                    {Authorization: "Bearer " + token}
                )
            
            if(response.status === 200){
                setFiles(response.data.files);
            }else{
                toast.error("Unable to fetch server files");
            }
        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Please login again!");
                navigate("/login");
            }else{
                toast.error("Internal server error!");
            }
        }   
        setLoading(false);
    }

    useEffect(() => {
        if(currentServer){
            fetchFiles()
        }
    }, [refreshFiles])

    return (
        <div>
            <div className="files-collection">
                {
                    files.length > 0 ? files.map(file => {
                        return <File key={file._id} file={file}/>
                    })
                    :
                    (
                        <div className="no-files">
                            No files found
                        </div>
                    )
                }
            </div>
            {
                loading && <Loader/>
            }
        </div>    
    )
}