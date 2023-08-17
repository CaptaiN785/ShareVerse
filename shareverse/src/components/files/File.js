import { FaTrash } from "react-icons/fa"
import { FiDownload } from "react-icons/fi"
import { useContext, useEffect, useState } from "react";
import { ConfirmPrompt } from "../prompts/ConfirmPrompt";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { apiConnector } from "../../services/instance";
import { useSelector } from "react-redux";
import { fileEndPoint } from "../../apiconnector/endPoints";
import { ServerAndFileContext } from "../../context/ServerAndFileContext";
import { Loader } from "../loader/Loader";
import { useLocation } from "react-router-dom";
import { DownloadPrompt } from "../prompts/DownloadPrompt";

export const File = ({file}) => {

    const token = useSelector((state) => state.auth.token);
    const currentServer = useSelector((state) => state.currentServer.value);
    const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
    const [confirmPromptResult, setConfirmPromptResult] = useState(false);
    const {setRereshFiles} = useContext(ServerAndFileContext)
    const [loading, setLoading] = useState(false);
    const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
    const [downloadLink, setDownloadLink] = useState(null);

    const navigate = useNavigate();
    const location = useLocation()

    const getDateTime = (givenDate) => {
        const date = new Date(givenDate).toDateString() +
            " "+ 
            new Date(givenDate).toLocaleTimeString()
        return date;
    }

    function confirmDelete(){
        setShowConfirmPrompt(true);
    }

    async function deleteFile(){
        setLoading(true);
        try{

            const response = await apiConnector(
                    fileEndPoint.DELETE,
                    "POST",
                    {
                        serverId: currentServer._id,
                        fileId: file._id
                    },
                    {Authorization: "Bearer " + token}
                )
            
            if(response.status === 200){
                toast.success("File deleted successfully");
                setRereshFiles((prev) => {return !prev});
            }else{
                toast.error("Unable to delete file!");   
            }
        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Please login error!");
                navigate("/login");
            }else{
                toast.error("Internal server error!");
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        if(confirmPromptResult){
            deleteFile();
        }
        setConfirmPromptResult(false);
    }, [confirmPromptResult])

    async function downloadFile(){
        setLoading(true);

        try{

            const response = await apiConnector(
                    fileEndPoint.DOWNLOAD,
                    "POST",
                    {
                        serverId: currentServer._id,
                        fileId: file._id
                    },
                    {Authorization: "Bearer " + token}
                )
            if(response.status === 200){
                setLoading(false);
                toast.success("Link generated successfully");
                setDownloadLink(response.data.url);
                setShowDownloadPrompt(true);
            }else{
                toast.error("Unable to download file!");   
            }
        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Please login error!");
                navigate("/login");
            }else{
                toast.error("Internal server error!");
            }
        }

        setLoading(false);

    }

    return (
        <div>
            <div className="file-card">
                <p className="file-card-name" title={file.name}>{file.name}</p>
                <p className="file-card-date">{getDateTime(file.uploadedat)}</p>
                <div className="file-card-button">
                    <button className="download" onClick={downloadFile}> <FiDownload/> </button>
                    <button onClick={confirmDelete} className="delete"> <FaTrash/> </button>
                </div>
            </div>
            {
                showConfirmPrompt && 
                <ConfirmPrompt 
                setShowConfirmPrompt={setShowConfirmPrompt}
                setConfirmPromptResult = {setConfirmPromptResult}
                />
            }
            {
                loading && <Loader/>
            }
            {
                showDownloadPrompt && 
                <DownloadPrompt 
                    setShowDownloadPrompt={setShowDownloadPrompt}
                    link={downloadLink}
                />
            }
        </div>    
    )

}