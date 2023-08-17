import "./Prompts.css"
import {BsArrowLeft} from "react-icons/bs"

export const DownloadPrompt = ({link, setShowDownloadPrompt}) => {

    return (
        <div className="download-prompt">
            <div>
                <a target="_blank" href={link} download onClick={() => setShowDownloadPrompt(false)}>
                    Click to download file
                </a>
                <div className="link-btn">
                    <button onClick={() => setShowDownloadPrompt(false)}
                        className="vertical-center"> 
                        <span><BsArrowLeft className="icon"/></span> 
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
            
        </div>    
    )

}