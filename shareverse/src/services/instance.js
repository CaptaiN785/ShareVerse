import axios from "axios";
export const axiosInstance = axios.create({});



export const apiConnector = (url, method, bodyData, headers, params) =>{
    return axiosInstance({
        url:`${url}`,
        method: `${method}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params : params ? params : null
    })
}