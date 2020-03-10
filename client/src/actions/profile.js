import {
    GET_PROFILE,
    PROFILE_ERROR,
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    TRANSACTION_ERROR
} from "./types";
import axios from "axios";

// Create or update profile
export const createProfile = (edit = false) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/v1/profile',{}, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data.data
        });

        //dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get all the transactions
export const getProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/v1/profile');

        console.log(res.data.data)

        dispatch({
            type: GET_PROFILE,
            payload: res.data.data
        })
    }catch (e) {
        dispatch({
            type: TRANSACTION_ERROR,
            payload: e.response.data.error
        })
    }
};

//Add a transaction
export const addTransaction = (transaction) => async dispatch =>{
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/v1/profile/transaction', transaction, config);

        dispatch({
            type: ADD_TRANSACTION,
            payload: res.data.data
        })
    }catch (e) {
        dispatch({
            type: TRANSACTION_ERROR,
            payload: e.response.data.error
        })
    }
};

//Delete a transaction
export const deleteTransaction= (id) => async dispatch => {
    try{
        await axios.delete(`/api/v1/profile/transaction/${id}`);

        dispatch({
            type:DELETE_TRANSACTION,
            payload: id
        });
    } catch (e) {
        dispatch({
            type: TRANSACTION_ERROR,
            payload: e.response.data.error
        })
    }
};