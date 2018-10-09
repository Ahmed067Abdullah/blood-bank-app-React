import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth : false,
    isSignup : true
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
                isAuth : true
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                isAuth : false
            }            
        default:
            return state;     
    }
}

export default reducer;