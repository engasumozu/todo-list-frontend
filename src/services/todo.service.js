import axios from 'axios';
import authHeader from '../utils/token-header.util';
import getUserId from "../utils/user.util";
import { BY_USER, TODO_BASE } from "../utils/routes.util";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const config = {
    headers: authHeader()
}

class TodoService {

    getAllByUser() {
        return axios.get(API_URL + BY_USER + getUserId(), config);
    }

    create(body) {
        return axios.post(API_URL + TODO_BASE, body, config);
    }

    update(id, body) {
        return axios.put(API_URL + TODO_BASE + id, body, config);
    }

    delete(id) {
        return axios.delete(API_URL + TODO_BASE + id, config);
    }
}

export default new TodoService();