import {
    TODO_READ,
    TODO_READ_FAIL,
    TODO_CREATE,
    TODO_CREATE_FAIL,
    TODO_DELETE,
    TODO_DELETE_FAIL,
    TODO_UPDATE,
    TODO_UPDATE_FAIL,
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

export const createAction = (body) => (dispatch) => {
    return TodoService
        .create(body)
        .then((response) => {
            dispatch({
                type: TODO_CREATE,
                payload: response
            });
            return Promise.resolve();
        },
            (error) => {
                const message = error.response.data.message ?? "Error";
                dispatch({
                    type: TODO_CREATE_FAIL
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                });
                return Promise.reject;
            });
}

export const deleteAction = (id) => (dispatch) => {
    return TodoService
        .delete(id)
        .then((response) => {
            dispatch({
                type: TODO_DELETE,
                payload: response
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.message ?? "Error";
                dispatch({
                    type: TODO_DELETE_FAIL
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                });
                return Promise.reject;
        });
}

export const updateAction = (id, body) => (dispatch) => {
    return TodoService
        .update(id, body)
        .then((response) => {
            dispatch({
                type: TODO_UPDATE,
                payload: response
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.message ?? "Error";
                dispatch({
                    type: TODO_UPDATE_FAIL
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                });
                return Promise.reject;
        });
}