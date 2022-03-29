import {
    TODO_READ,
    TODO_READ_FAIL
} from "../utils/type.util";

const initialState = { data: [] };

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
        default:
            return state;
    }
}