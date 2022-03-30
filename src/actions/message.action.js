import {
    CLEAR_MESSAGE
} from "../utils/type.util";

export const clearMessage = () => (dispatch) => {
    return dispatch({
        type: CLEAR_MESSAGE,
    });
}