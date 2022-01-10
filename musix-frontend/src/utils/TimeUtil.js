export default {
    getTimeDifference(time) {
        const now = new Date()
        const earlier = new Date(time)
        var difference = Math.round((now - earlier) / 1000)
        if(difference < 60){
            return `${difference} Seconds Ago`
        }
        else if(difference < 3600){
            return `${Math.round(difference / 60)} Minutes Ago`
        }
        else if(difference < 86400){
            return `${Math.round(difference / 3600)} Hours Ago`
        }
        else{
            return `${Math.round(difference / 86400)} Days Ago`
        }
    }
}