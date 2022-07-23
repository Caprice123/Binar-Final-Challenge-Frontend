export const dateToString = (time) => {
    time = new Date(time)
    const monthName = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    const date = time.getDate()
    const month = monthName[time.getMonth()]
    const year = time.getFullYear()
    
    const hour = String(time.getHours()).padStart(2, 0)
    const minute = String(time.getMinutes()).padStart(2, 0)
    // const seconds = time.getSeconds()

    return `${date} ${month} ${year} ${hour}:${minute}`
}