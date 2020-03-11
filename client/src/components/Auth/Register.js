import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import './style.css';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    });

    const { firstName,lastName, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ firstName,lastName, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className="container">
            <h1 className='large text-primary'>Register</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Create Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='firstName'
                        name='firstName'
                        value={firstName}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='lastName'
                        name='lastName'
                        value={lastName}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Register' />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/'>Log In</Link>
            </p>
        </div>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { register,
    setAlert }
)(Register);