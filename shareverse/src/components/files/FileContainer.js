import "./File.css"
import { useSelector } from "react-redux"
import { FileContainerHeader } from "./FileCotainerHeader";
import { Files } from "./Files";

export const FileContainer = () => {

    const currentServer = useSelector((state) => state.currentServer.value);
    
    return (
        <div className="file-wrapper">
            <div className="file-container">
                <FileContainerHeader currentServer={currentServer}/>
                {/* list of all files */}
                <Files/>
            </div>
        </div>    
    )
}