import axios from 'axios';
import authHeader from '../utils/token-header.util';
import getUserId from "../utils/user.util";
import { BY_USER, TODO_BASE } from "../utils/routes.util";

const API_URL = 'http://localhost:3000/';

const config = {
    headers: authHeader()
}

class TodoService {

    getAllByUser() {
        return axios.get(API_URL + BY_USER + getUserId(), config);
    }

    create() {
        return axios.post(API_URL + TODO_BASE, {}, config);
    }

    update(id) {
        return axios.put(API_URL + TODO_BASE + id, {}, config);
    }

    delete(id) {
        return axios.delete(API_URL + TODO_BASE + id, config);
    }
}

export default new TodoService();