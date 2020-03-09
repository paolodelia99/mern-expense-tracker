import React, {Fragment} from 'react';
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./incomeExpenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";

const DashBoard = () => {
    return (
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