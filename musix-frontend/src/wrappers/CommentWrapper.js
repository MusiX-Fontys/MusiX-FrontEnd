import axios from "axios";

const baseUrl = process.env.VUE_APP_API_BASE_URL;

export default {

    getHeaders(){
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }
    },

    async postComment(id, comment){

        let response;
        try{
            response =  await axios.post(`${baseUrl}/Comment/${id}`, { comment: comment }, this.getHeaders())
        }
        catch(error){
            response = error.response
        }

        return {
            success: response.data["success"],
            message: response.data["message"]
        }
    }
}