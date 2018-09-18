import * as actionTypes from '../actionTypes';

const initialState = {
    meals: [],
    intake: null,
    totalKcal: 0,
    startDay: '',
    startMonth: '',
    startYear: '',
    endDay: '',
    endMonth: '',
    endYear: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INTAKE:
            return {
                ...state,
                intake: action.intake
            }

        case actionTypes.GET_MEALS:
            return {
                ...state,
                meals: action.meals
            }

        case actionTypes.GET_TOTAL_KCAL:
            return {
                ...state,
                totalKcal: action.totalKcal
            }

        case actionTypes.GET_START_DAY:
            return {
                ...state,
                startDay: action.day
            }

        case actionTypes.GET_START_MONTH:
            return {
                ...state,
                startMonth: action.month
            }

        case actionTypes.GET_START_YEAR:
            return {
                ...state,
                startYear: action.year
            }

        case actionTypes.GET_END_DAY:
            return {
                ...state,
                endDay: action.day
            }

        case actionTypes.GET_END_MONTH:
            return {
                ...state,
                endMonth: action.month
            }

        case actionTypes.GET_END_YEAR:
            return {
                ...state,
                endYear: action.year
            }

        default:
            return state;
    }
}

export default reducer;