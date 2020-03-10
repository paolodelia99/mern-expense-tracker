import React, {Fragment, useContext,useEffect} from 'react';
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./incomeExpenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import {GlobalContext} from "../context/GlobalState";
import Spinner from "./Layout/Spinner";

const DashBoard = () => {
    const {getProfile, user, loading} = useContext(GlobalContext);
    useEffect(()=> {
        getProfile();
    },[getProfile]);

    return loading && user === null ? (
        <Spinner/>
    ) : (
        <Fragment>
            <div>
                <Header/>
                <div className="container">
                    <Balance/>
                    <IncomeExpenses/>
                    <TransactionList/>
                    <AddTransaction/>
                </div>
            </div>
        </Fragment>
    );
};

export default DashBoard;