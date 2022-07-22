export const validateNumber = (value, onSuccess, onError) => {
    const filteredValue = value.replaceAll(/\D/g, '')
    if (value === "") value = 0
    if (Number(value) < 0) value = 0
    
    onSuccess(Number(filteredValue))
}