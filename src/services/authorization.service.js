import axios from "axios";
import { LOGIN, REGISTER } from "../utils/routes.util";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class AuthorizationService {
    
    login(email, password) {
        return axios
            .post(API_URL + LOGIN, { email, password })
            .then((response) => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(JSON.parse(localStorage.getItem('user')))
                }
                return response.data;
            });
    }

    register(email, password) {
        return axios.post(API_URL + REGISTER, {
            email,
            password,
        });
    }


    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthorizationService();