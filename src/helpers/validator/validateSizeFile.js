export const validateSizeFile = (file, maxSize) => {
    const fileSizeKb = file.size / 1024
    const fileSizeMb = fileSizeKb / 1024
    if (fileSizeMb > 5){
        alert(`File ${file.name} size melebihi batas maksimal (5 MiB)`)
        return 0
    }
    return 1
}