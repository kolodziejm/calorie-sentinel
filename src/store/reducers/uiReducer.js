import * as actionTypes from '../actionTypes';

const initialState = {
    loading: false,
    settingsModal: false,
    dailyModal: false,
    showMobileNav: false,
    dailyEditModal: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HIDE_MODAL:
            return {
                ...state,
                settingsModal: false,
                dailyModal: false,
                showMobileNav: false,
                dailyEditModal: false
            }

        case actionTypes.SHOW_MOBILE_NAV:
            return {
                ...state,
                settingsModal: false,
                dailyModal: false,
                dailyEditModal: false,
                showMobileNav: true
            }

        case actionTypes.HIDE_MOBILE_NAV:
            return {
                ...state,
                settingsModal: false,
                dailyModal: false,
                showMobileNav: false,
                dailyEditModal: false
            }

        case actionTypes.SHOW_DAILY_MODAL:
            return {
                ...state,
                dailyModal: true
            }

        case actionTypes.SHOW_SETTINGS_MODAL:
            return {
                ...state,
                settingsModal: true
            }

        case actionTypes.HIDE_SETTINGS_MODAL:
            return {
                ...state,
                settingsModal: false
            }

        case actionTypes.SHOW_DAILY_EDIT_MODAL:
            return {
                ...state,
                dailyEditModal: true
            }

        case actionTypes.HIDE_DAILY_EDIT_MODAL:
            return {
                ...state,
                dailyEditModal: false
            }

        case actionTypes.LOADING_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.LOADING_END:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default reducer;