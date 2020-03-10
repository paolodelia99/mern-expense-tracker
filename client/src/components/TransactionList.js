import React from 'react';
import Transaction from './Transaction';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TransactionList = ({profile: {transactions, transactionsLoading}}) => {

    console.log(transactions)
    const transactionsList = transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction}/>));

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {!transactionsLoading ? transactionsList : null}
            </ul>
        </>
    );
};

TransactionList.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(TransactionList);