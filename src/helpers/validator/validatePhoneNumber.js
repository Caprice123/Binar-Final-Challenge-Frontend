export const validatePhoneNumber = (value, prefix, onSuccess) => {
    let filteredValue = value.replace(/\D/g, '')
    if (value[0] !== prefix){
        filteredValue = prefix + filteredValue
    } 

    onSuccess(`${filteredValue}`)
}