import React from 'react';
//Redux
import PropTypes from 'prop-types';

const Header = ({user}) => {
    return (
        <h2 className='text-center'>
            Hello, {user.firstName} {user.lastName} !
        </h2>
    );
};

Header.propTypes = {
    user: PropTypes.object.isRequired
}

export default Header;