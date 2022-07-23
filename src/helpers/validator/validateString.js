export const validateString = (value, onSuccess) => {
    let filteredValue = value.replaceAll(/[^\w\s.]/gi, '')
    filteredValue = filteredValue.replaceAll(/[0-9]/g, '')

    let space = false
    let dot = false
    let filteredValueWithoutSpace = ""
    for(let char of filteredValue){
        if (char === " "){
            if (!space){
                space = true
                if (!dot){
                    filteredValueWithoutSpace += char
                }
            }
        } else if (char === "."){
            if (!dot){
                dot = true
                if (!space){
                    filteredValueWithoutSpace += char
                }
            }
        } else {
            filteredValueWithoutSpace += char
            dot = false
            space = false
        }
    }
    onSuccess(filteredValueWithoutSpace)
}

