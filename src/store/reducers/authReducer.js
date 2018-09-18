import * as actionTypes from '../actionTypes';

const initialState = {
    authenticated: false,
    uid: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_UID:
            return {
                ...state,
                authenticated: true,
                uid: action.uid
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                authenticated: false
            }

        default:
            return state;
    }
}

export default reducer;