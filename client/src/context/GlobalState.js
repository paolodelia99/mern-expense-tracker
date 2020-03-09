import React,{createContext,useReducer} from "react";
import ProfileReducer from './ProfileReducer';
import axios from 'axios'

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

    //Actions
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
            auth: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            transactions: state.transactions,
            error: state.error,
            transactionsLoading: state.transactionsLoading,
            deleteTransaction,
            addTransaction,
            getProfile
        }}
    >
        {children}
    </GlobalContext.Provider>)
}