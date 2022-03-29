import {
    TODO_READ,
    TODO_READ_FAIL,
    SET_MESSAGE
} from "../utils/type.util";

import TodoService from "../services/todo.service";

export const getAllAction = () => (dispatch) => {
    return TodoService
        .getAllByUser()
        .then(
            (response) => {
                dispatch({
                    type: TODO_READ,
                    payload: response
                });
                return Promise.resolve();
            },
            (error) => {
                const message = error.response.data.message ?? "Error";
                dispatch({
                    type: TODO_READ_FAIL
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                });
                return Promise.reject;
            });
}