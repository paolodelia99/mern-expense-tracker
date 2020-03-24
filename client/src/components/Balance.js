import React from 'react';
import { numberWithCommas } from "../utils/format";
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Balance = ({profile : {transactions}}) => {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>€{numberWithCommas(total)}</h1>
        </>
    );
};

Balance.propTypes = {
    profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps)(Balance);
