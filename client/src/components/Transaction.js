import React from 'react';
import { numberWithCommas } from "../utils/format";
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {deleteTransaction} from "../actions/profile";

const Transaction = ({transaction,deleteTransaction}) => {
    const sign = transaction.amount < 0 ? "-" : "+";
    const rightClass = transaction.amount < 0 ? "minus" : "plus";

    return (
        <li className={rightClass}>
            {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
            <button
                className="delete-btn"
                onClick={() => deleteTransaction(transaction._id)}
            >x</button>
        </li>
    );
};

Transaction.propTypes = {
    deleteTransaction: PropTypes.func.isRequired,
    transaction: PropTypes.object.isRequired
};

export default connect(null,{deleteTransaction})(Transaction);