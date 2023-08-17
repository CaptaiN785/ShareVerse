import { useContext, useState } from "react";
import { Loader } from "../loader/Loader";
import { ServerAndFileContext } from "../../context/ServerAndFileContext";
import { BsArrowLeft } from "react-icons/bs"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {apiConnector} from "../../services/instance"
import { fileEndPoint } from "../../apiconnector/endPoints";
import { useSelector } from "react-redux";

export const FileUploadModal = () => {

    const currentServer = useSelector((state) => state.currentServer.value)
    const token = useSelector((state) => state.auth.token);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const {setShowFileUploadMoal, setRereshFiles} = useContext(ServerAndFileContext);
    const [file, setFile] = useState(null);
    const navigate = useNavigate()

    function inputChangeHandler(event){
        setFileName(event.target.value);
    }

    function fileChangeHandler(event){
        setFile(event.target.files[0]);
    }

    function goBack(){
        setShowFileUploadMoal(false);
    }

    async function uploadFile(event){
        event.preventDefault();
        
        if(!file){
            toast.warn("Please upload a file.");
            return;
        }

        if(fileName === ""){
            toast.warn("Please enter file name");
            return;
        }

        if(file.size/(1024 * 1024) > 10){
            toast.warn("File size exceeds 10MB size");
            return;
        }

        setLoading(true);

        try{

            const formData = new FormData();;
            formData.append("file", file);
            formData.append("name", fileName);
            formData.append("serverId", currentServer._id);

            const response = await apiConnector(
                fileEndPoint.UPLOAD,
                "POST",
                formData,
                {"Authorization": "Bearer " + token}
                )
            
            if(response.status === 200){
                toast.success("File uploaded successfully");
                setRereshFiles((prev) => {return !prev});
            }else{
                toast.error("Unable to upload file");
            }
        }catch(err){
            if(err?.response?.status === 403){
                toast.error("Please login again!");
                navigate("/login");
            }else{
                toast.error("Internal server error!");
            }
            console.log(err);
        }
        goBack();
        setLoading(false);
    }

    return (
        <div className="upload-file-modal-container">
            <form className="form-container" onSubmit={uploadFile} >
                <div className="form-header">
                    <h2>Upload your file</h2>
                </div>
                <div className="form-body">
                    <div className="input-control">
                        <label htmlFor="name">File name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="shareverse"
                            value={fileName}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    <div className="input-control">
                        <label htmlFor="file">Select file</label>
                        <input 
                            type="file" 
                            name="file" 
                            id="file" 
                            onChange={fileChangeHandler}
                            placeholder="shareverse"
                        ></input>
                    </div>
                    <div className="input-control">
                        <button type="submit">Upload file</button>
                    </div>
                </div>
                <div className="form-footer">
                    <div className="external-form-link text-center">
                    <div className="link-btn">
                        <button onClick={goBack} className="vertical-center"> 
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