import * as actionTypes from './actionTypes';

// authReducer

export const getUid = uid => {
    return {
        type: actionTypes.GET_UID,
        uid: uid
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}


// itemReducer

export const getIntake = (intake) => {
    return {
        type: actionTypes.GET_INTAKE,
        intake: intake
    }
}

export const getMeals = meals => {
    return {
        type: actionTypes.GET_MEALS,
        meals: meals
    }
}

export const getTotalKcal = kcal => {
    return {
        type: actionTypes.GET_TOTAL_KCAL,
        totalKcal: kcal
    }
}

export const getStartDay = day => {
    return {
        type: actionTypes.GET_START_DAY,
        day: day
    }
}

export const getStartMonth = month => {
    return {
        type: actionTypes.GET_START_MONTH,
        month: month
    }
}

export const getStartYear = year => {
    return {
        type: actionTypes.GET_START_YEAR,
        year: year
    }
}

export const getEndDay = day => {
    return {
        type: actionTypes.GET_END_DAY,
        day: day
    }
}

export const getEndMonth = month => {
    return {
        type: actionTypes.GET_END_MONTH,
        month: month
    }
}

export const getEndYear = year => {
    return {
        type: actionTypes.GET_END_YEAR,
        year: year
    }
}



// uiReducer

export const hideModal = () => {
    return {
        type: actionTypes.HIDE_MODAL
    }
}

export const showMobileNav = () => {
    return {
        type: actionTypes.SHOW_MOBILE_NAV
    }
}

export const hideMobileNav = () => {
    return {
        type: actionTypes.HIDE_MOBILE_NAV
    }
}

export const showDailyModal = () => {
    return {
        type: actionTypes.SHOW_DAILY_MODAL
    }
}

export const showDailyEditModal = () => {
    return {
        type: actionTypes.SHOW_DAILY_EDIT_MODAL
    }
}

export const hideDailyEditModal = () => {
    return {
        type: actionTypes.HIDE_DAILY_EDIT_MODAL
    }
}

export const showSettingsModal = () => {
    return {
        type: actionTypes.SHOW_SETTINGS_MODAL
    }
}

export const hideSettingsModal = () => {
    return {
        type: actionTypes.HIDE_SETTINGS_MODAL
    }
}

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    }
}

export const loadingEnd = () => {
    return {
        type: actionTypes.LOADING_END
    }
}