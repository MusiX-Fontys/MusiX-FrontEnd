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

    async getProfileById(id){

        let response;
        try{
            response =  await axios.get(`${baseUrl}/Profile/${id}`)
        }
        catch(error){
            response = error.response
        }

        return {
            success: response.data["success"],
            message: response.data["message"],
            profile: response.data["data"]["profile"]
        }
    },

    async getProfilesBySearchQuery(search){

        let response;
        try{
            response =  await axios.get(`${baseUrl}/Profile/search/${search}`)
        }
        catch(error){
            response = error.response
        }

        return {
            success: response.data["success"],
            message: response.data["message"],
            profiles: response.data["data"]["profiles"]
        }
    },

    async followUser(id){

        let response;
        try{
            response =  await axios.put(`${baseUrl}/Profile/follow/${id}`, null, this.getHeaders())
        }
        catch(error){
            response = error.response
        }

        return {
            success: response.data["success"],
            message: response.data["message"]
        }
    },

    async unfollowUser(id){

        let response;
        try{
            response =  await axios.put(`${baseUrl}/Profile/unfollow/${id}`, null, this.getHeaders())
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