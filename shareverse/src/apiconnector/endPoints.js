const BASE_URL="https://share-verse-api.vercel.app"

export const otp = {
    SEND_OTP: BASE_URL + "/otp/send",
    RESEND_OTP: BASE_URL + "/otp/resend",
    VERIFY_OTP: BASE_URL + "/otp/verify",
}

export const user = {
    SIGNUP: BASE_URL + "/user/signup",
    LOGIN: BASE_URL + "/user/login",
    CHANGE_PASSWORD: BASE_URL + "/user/change-password"
}

export const server = {
    CREATE: BASE_URL + "/server/create",
    GET: BASE_URL + "/server/get",
    DELETE: BASE_URL + "/server/delete"
}

export const fileEndPoint = {
    UPLOAD: BASE_URL + "/file/upload",
    DELETE: BASE_URL + "/file/delete",
    DOWNLOAD: BASE_URL + "/file/download",
    GET: BASE_URL + "/file/get"
}