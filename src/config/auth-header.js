export const authHeader = (contentType) => {
    const { currentUser } = JSON.parse(localStorage.getItem("userState"))
    const token = currentUser.token
    
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