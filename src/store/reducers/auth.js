import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth : false,
    isSignup : false,
    uid : '',
    isDonor : false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SIGNIN : 
            return{
                ...state,
                isSignup : false
            }
        case actionTypes.SET_SIGNUP:
            return{
                ...state,
                isSignup : true
            }
        case actionTypes.LOGIN : 
            return{
                ...state,
                isAuth : true,
                uid : action.uid
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                isAuth : false,
                isSignup : true,
                uid : '',
                isDonor : false

            }
        case actionTypes.REGISTERED_DONOR:
            return{
                ...state,
                isDonor : true
            }            
        default:
            return state;     
    }
}

export default reducer;