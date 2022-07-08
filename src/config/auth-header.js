export const authHeader = (contentType) => {
    const { user } = JSON.parse(localStorage.getItem("userState"))
    const token = user.token
    
    const headers = {
        headers: {}
    }

    if (token){
        headers['headers']['Authorization'] = `Bearer ${token}`
    }

    if (contentType){
        headers['headers']['Content-Type'] = contentType
    }

    return headers
}