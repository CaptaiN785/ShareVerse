import { useContext } from "react";
import { ServerAndFileContext } from "../../context/ServerAndFileContext";
import {BsPlusLg, BsArrowLeft} from "react-icons/bs"
import { FileUploadModal } from "./FileUploadModal";

export const FileContainerHeader = ({currentServer}) => {

    const {showFileUploadModal, setShowFileUploadMoal, setServerOrFile} = useContext(ServerAndFileContext);
    function enableFileUploadModal(){
        setShowFileUploadMoal(true);
    }

    return (
        <div>
            <div className="file-server-name">
                <p>{currentServer.name}</p>
            </div>
            <div className="file-container-header">
                <div className="link-btn">
                    <button onClick={()=> setServerOrFile("server")} className="vertical-center"> 
                        <span><BsArrowLeft className="icon"/></span> 
                        <span>Go Back</span>
                    </button>
                </div>
                <div className="upload-file-btn">
                    <button onClick = {enableFileUploadModal}> <BsPlusLg className="icon"/> <span>Upload File</span></button>
                </div>
            </div>
            {
                showFileUploadModal && <FileUploadModal/>
            }
        </div>   
    )
}