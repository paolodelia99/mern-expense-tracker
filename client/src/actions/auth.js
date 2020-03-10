import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE, GET_LOADED_USER
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { createProfile, getProfile } from "./profile";
import axios from "axios";

//Load User
export const loadUser = (register) => dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);

        dispatch({
            type: USER_LOADED,
        })
    }else{
        dispatch({
            type: AUTH_ERROR
        })
    }
};

//Get loadedUser
export const getLoadedUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('api/v1/auth');

        dispatch({
            type: GET_LOADED_USER,
            payload: res.data
        })
    }catch (e) {
        console.log(e)

        dispatch({
            type: AUTH_ERROR
        })
    }
};

// Register User
export const register = ({ firstName,lastName, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ firstName,lastName, email, password });

    try {
        const res = await axios.post('/api/v1/user', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
        dispatch(createProfile());
    } catch (err) {
        console.log(err)
        // const errors = err.response.data.errors;
        //
        // if (errors) {
        //     //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/v1/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
        dispatch(getProfile());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Logout / Clear Profile
export const logout = () => async dispatch =>{
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
