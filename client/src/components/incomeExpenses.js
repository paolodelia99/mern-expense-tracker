import React from 'react';
import { numberWithCommas } from "../utils/format";
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const IncomeExpenses = ({profile:{transactions}}) => {
    const amounts = transactions.map(transaction => transaction.amount);
    //Calculate the income from the amouts
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    //Calculate the expenses from the amouts
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p  className="money plus">+€{numberWithCommas(income)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">-${numberWithCommas(expense)}</p>
            </div>
        </div>
    );
};

IncomeExpenses.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(IncomeExpenses);
