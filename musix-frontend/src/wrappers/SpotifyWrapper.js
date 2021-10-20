import axios from "axios";

const client_id = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.VUE_APP_SPOTIFY_REDIRECT_URI;

export default {
    
    getAuthorizationUrl(){
        const params = {
          client_id: client_id,
          response_type: "code",
          redirect_uri: redirect_uri,
          scope: "user-read-private playlist-modify-private playlist-read-collaborative user-read-recently-played"
        };
      
        const encodedQueryParams = this.encodeQueryParams(params);
      
        return `https://accounts.spotify.com/authorize?${encodedQueryParams}`;
    },
      
    encodeQueryParams(obj){
        let str = [];
        for (let key in obj)
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
            }
        return str.join("&");
    },

    async getAccessToken(requestCode){
        const data = new URLSearchParams()
        data.append('grant_type', 'authorization_code')
        data.append('code', requestCode)
        data.append('redirect_uri', redirect_uri)

        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(client_id + ':' + client_secret)}`,
          }
        }

        const response =  await axios.post('https://accounts.spotify.com/api/token', data, config)

        return {
            access_token: response.data['access_token'],
            refresh_token: response.data['refresh_token'],
            exp_time: response.data['expires_in']
        }
    }
}