import React,{useState} from 'react';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addTransaction} from "../actions/profile";

const AddTransaction = ({addTransaction}) => {
    const [text,setText] = useState('');
    const [amount,setAmount] = useState(0);

    const handleSumbit = e => {
        e.preventDefault();

        addTransaction(
            {
                text,
                amount: parseInt(amount)
            }
        )
    };

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={e => handleSumbit(e)}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input
                        type="text"
                        placeholder="Enter text..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br/>
                        (negative - expense, positive - income)</label
                    >
                    <input
                        type="number"
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    );
};

AddTransaction.propTypes = {
    addTransaction: PropTypes.func.isRequired
};

export default connect(null,{addTransaction})(AddTransaction);