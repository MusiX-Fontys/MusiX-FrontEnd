import axios from "axios";

// Base url can be found in the .env file in the root folder
export const baseUrl = process.env.VUE_APP_API_BASE_URL;

export default {

    async signIn(data) {

        var response;

        try{
            response =  await axios.post(`${baseUrl}/api/Authentication`, data)

            console.log(response)

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