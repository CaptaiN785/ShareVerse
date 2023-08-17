import { createContext, useState } from "react";



export const ServerAndFileContext = createContext()

export const ServerAndFileContextProvider = ({children}) => {

    const [serverOrFile, setServerOrFile] = useState("server");
    const [showFileUploadModal, setShowFileUploadMoal] = useState(false);
    const [refreshFiles, setRereshFiles] = useState(false);
    const [refreshServer, setRefreshServer] = useState(false);

    const value = {
        serverOrFile,
        setServerOrFile,
        showFileUploadModal,
        setShowFileUploadMoal,
        setRereshFiles,
        refreshFiles,
        refreshServer,
        setRefreshServer
    }

    return (
        <ServerAndFileContext.Provider value={value}>
            {children}
        </ServerAndFileContext.Provider>
    )
}