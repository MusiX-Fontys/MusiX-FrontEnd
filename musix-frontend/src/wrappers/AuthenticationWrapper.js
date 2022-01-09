import axios from "axios";

export const baseUrl = process.env.VUE_APP_API_BASE_URL;

export default {

    async signIn(data) {

        var response;

        try{
            response =  await axios.post(`${baseUrl}/Authentication`, data)

            return {
                success: response.data["success"],
                token: response.data["data"]["token"]
            }
        }
        catch(error){
            response = error.response

            return {
                success: response.data["success"],
                message: response.data["message"]
            }
        }
    }
} 