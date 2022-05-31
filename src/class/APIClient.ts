import axios from 'axios';

axios.defaults.baseURL = "https://papermc.io/api/v2";

export class APIClient {

    static async get(path:string) {
        try {
            let res = await axios.get(path);
            return res.data;
        } catch(e) {
            console.error(e);
            return false;
        }
    }

}