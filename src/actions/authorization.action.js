import {
    REGISTER_OK,
    REGISTER_FAIL,
    LOGIN_OK,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from "../utils/type.util";

import AuthorizationService from "../services/authorization.service";

export const registerAction = (email, password) => (dispatch) => {
    return AuthorizationService
        .register(email, password)
        .then(
            (response) => {
                dispatch({
                    type: REGISTER_OK
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: response.statusText
                });
                return Promise.resolve();
            },
            (error) => {
                const message = error.response.data.message ?? "Error";
                dispatch({
                    type: REGISTER_FAIL
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                });
                return Promise.reject;
            });
}

export const loginAction = (email, password) => (dispatch) => {
    return AuthorizationService
        .login(email, password)
        .then(
            (response) => {
                dispatch({
                    type: LOGIN_OK,
                    payload: { user: response },
                });
                dispatch({
                    type: CLEAR_MESSAGE,
                });
                return Promise.resolve();
            },
            (error) => {
                const message = error.response.data.message ?? "Error";
                dispatch({
                    type: LOGIN_FAIL,
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject();
            }
        );
}

export const logoutAction = () => (dispatch) => {
    AuthorizationService.logout();
    dispatch({
        type: LOGOUT,
    });
};