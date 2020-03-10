import React, {Fragment,useEffect} from 'react';
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./incomeExpenses";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import Spinner from "./Layout/Spinner";
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../actions/profile';
import NavBar from "./Layout/NavBar";

const DashBoard = ({auth: { user, loading}, profile:{transactionsLoading} , getProfile}) => {
    useEffect(()=> {
        getProfile();
    },[getProfile]);

    return loading && transactionsLoading ? (
        <Spinner/>
    ) : (
        <div>
            <NavBar/>
            <div className="container">
                <Header user={user}/>
                <Balance/>
                <IncomeExpenses/>
                <TransactionList/>
                <AddTransaction/>
            </div>
        </div>
    );
};

DashBoard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfile }
    )(DashBoard);