import {
    TODO_READ,
    TODO_READ_FAIL,
    TODO_CREATE,
    TODO_CREATE_FAIL,
    TODO_DELETE,
    TODO_DELETE_FAIL,
    TODO_UPDATE,
    TODO_UPDATE_FAIL
} from "../utils/type.util";

const initialState = {
    data: [],
    created: {},
    updated: {},
    deleted: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case TODO_READ:
            return {
                ...state,
                data: payload,
            };
        case TODO_READ_FAIL:
            return {
                ...state,
                data: {},
            };
        case TODO_CREATE:
            return {
                ...state,
                created: payload,
            };
        case TODO_CREATE_FAIL:
            return {
                ...state,
                created: {},
            };
        case TODO_DELETE:
            return {
                ...state,
                deleted: payload,
            };
        case TODO_DELETE_FAIL:
            return {
                ...state,
                created: {},
            };
        case TODO_UPDATE:
            return {
                ...state,
                updated: payload,
            };
        case TODO_UPDATE_FAIL:
            return {
                ...state,
                updated: {},
            };
        default:
            return state;
    }
}