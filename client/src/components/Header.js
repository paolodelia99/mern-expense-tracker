import React from 'react';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({auth:{user,loading}}) => {
    return (
        <h2 className='text-center'>
            Hello, {!loading && user ? user.firstName : null} {!loading && user ? user.lastName : null} !
        </h2>
    );
};

Header.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Header);