import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    transactions: [],
    error:null,
    loading: true
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions(){
        try{
            const res = await axios.get('/api/v1/transactions');

            dispatch({
                type: "GET_TRANSACTIONS",
                payload: res.data.data
            });

        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error
            });
        }
    }


    async function deleteTransaction(id){
        try{
            await axios.delete(`/api/v1/transactions/${id}`);
        } catch(err){
                dispatch({
                    type: "TRANSACTION_ERROR",
                    payload: err.response.data.error
                });
            }
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    async function addTransaction(transaction){
        try{
            const res = await axios.post('/api/v1/transactions/', transaction, 
            {headers: {'Content-Type' : 'application/json'}});

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })

        } catch(err){
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error
            });
        }
        
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction,
            error: state.error,
            laoding: state.laoding,
            getTransactions
        }}>
            {children}
            </GlobalContext.Provider>
    )

}