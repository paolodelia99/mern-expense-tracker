import React, { Fragment, useState,useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {GlobalContext} from "../../context/GlobalState";

const Register = () => {
    const {register, isAuthenticated} = useContext(GlobalContext);
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
            //stub
            alert("Passwords do not match")
            //setAlert('Passwords do not match', 'danger');
        } else {
            register({ firstName,lastName, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign Up</h1>
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
            <p className='my-1'> Already have an account? <Link to='/'>Sign In</Link></p>
    </Fragment>);
};

export default Register;