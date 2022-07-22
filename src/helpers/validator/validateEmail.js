export const validateEmail = (value) => {
    var re = /^([A-Za-z][A-Za-z0-9\-\.\_]*)\@([A-Za-z][A-Za-z0-9\-\_]*)(\.[A-Za-z][A-Za-z0-9\-\_]*)+$/ 
    if (re.test(value)){
        return true
    }
    return false
}
