import React,{useContext, useRef, useLayoutEffect} from 'react';
import {GlobalContext} from '../context/GlobalState';
import Transaction from './Transaction'

const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            getTransactions();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            return;
        }

    },[]);

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction}/>))}
            </ul>
        </>
    );
};

export default TransactionList;