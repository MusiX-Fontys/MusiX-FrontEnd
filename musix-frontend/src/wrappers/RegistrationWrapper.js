import axios from "axios";

export const baseUrl = process.env.VUE_APP_API_BASE_URL;

export default {

    async signUp(data) {

        var response;

        try{
            response =  await axios.post(`${baseUrl}/Registration`, data)
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