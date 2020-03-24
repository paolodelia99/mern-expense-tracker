import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({logout}) => {
    return (
        <nav className="custom-navbar">
            <ul className="custom-ul">
                <li className="custom-nav-item">
                    <a className="nav-link" onClick={logout} href='/'>Logout</a>
                </li>
            </ul>
        </nav>
    );
};

NavBar.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null,{logout})(NavBar);