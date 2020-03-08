import React,{createContext,useReducer} from "react";
import AppReducer from './AppReducer';
import axios from 'axios'

//Initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer, initialState);

    //Actions
    //Get all the transactions
    async function getTransactions() {
        try{
            const res = await axios.get('/api/v1/transactions');

            dispatch({
                type: 'GET_TRANSACTIONS',
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
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);

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
            await axios.delete(`/api/v1/transactions/${id}`);

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
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            deleteTransaction,
            addTransaction,
            getTransactions
        }}
    >
        {children}
    </GlobalContext.Provider>)
}