import React,{createContext,useReducer} from "react";
import ProfileReducer from './ProfileReducer';
import axios from 'axios'
import AuthReducer from "./AuthReducer";
import setAuthToken from "../utils/setAuthToken";

//Initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    transactions: [],
    error: null,
    transactionsLoading: true
}

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(ProfileReducer, initialState);
    const [authState,authDispatch] = useReducer(AuthReducer, initialState);

    //Actions
    //Auth Actions
    //Load User
    async function loadUser(register){
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }

        try{
            const res = await axios.get('/api/v1/auth');

            if(register)
                dispatch(createProfile());

            authDispatch({
                type: 'USER_LOADED',
                payload: res.data.user
            })
        }catch (err) {
            authDispatch({
                type: 'AUTH_ERROR'
            })
        }
    };

    // Register User
    async function register ({ firstName,lastName, email, password }){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ firstName,lastName, email, password });

        try {
            const res = await axios.post('/api/v1/user', body, config);

            authDispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            });

            authDispatch(loadUser(true));
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            authDispatch({
                type: 'REGISTER_FAIL'
            });
        }
    };

    // Login User
    async function login (email, password) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/v1/auth', body, config);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });

            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: 'LOGIN_FAIL'
            });
        }
    };

    // Logout / Clear Profile
    async function logout() {
        //authDispatch({ type: 'CLEAR_PROFILE' });
        authDispatch({ type: 'LOGOUT' });
    };

    //Profile Actions
    // Create or update profile
    async function createProfile( edit = false){
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await axios.post('/api/v1/profile',{}, config);

            dispatch({
                type: 'GET_PROFILE',
                payload: res.data.data
            });

            //dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: 'PROFILE_ERROR',
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    };

    //Get all the transactions
    async function getProfile() {
        try{
            const res = await axios.get('/api/v1/profile');

            dispatch({
                type: 'GET_PROFILE',
                payload: res.data.data
            })
        }catch (e) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e.response.data.error
            })
        }
    }

    //Add a transaction
    async function addTransaction(transaction) {
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/v1/profile/transaction', transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        }catch (e) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e.response.data.error
            })
        }
    }

    //Delete a transaction
    async function deleteTransaction(id) {
        try{
            await axios.delete(`/api/v1/profile/transaction/${id}`);

            dispatch({
                type:'DELETE_TRANSACTION',
                payload: id
            });
        } catch (e) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e.response.data.error
            })
        }
    }



    return (<GlobalContext.Provider
        value={{
            auth: authState.isAuthenticated,
            loading: authState.loading,
            user: authState.user,
            transactions: state.transactions,
            error: state.error,
            transactionsLoading: state.transactionsLoading,
            deleteTransaction,
            addTransaction,
            getProfile,
            logout,
            login,
            register,
            loadUser
        }}
    >
        {children}
    </GlobalContext.Provider>)
}