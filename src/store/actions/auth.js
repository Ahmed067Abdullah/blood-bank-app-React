import * as actionTypes from './actionTypes';

export const setSignin = () => {
    return{
        type : actionTypes.SET_SIGNIN
    }
}

export const setSignup = () => {
    return{
        type : actionTypes.SET_SIGNUP
    }
}

export const login = () => {
    return{
        type : actionTypes.LOGIN
    }
}

export const logout = () => {
    return{
        type : actionTypes.LOGOUT
    }
}

