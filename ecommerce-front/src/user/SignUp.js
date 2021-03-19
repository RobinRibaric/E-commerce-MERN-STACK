import React, { useState } from 'react'
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signUp } from '../auth';


const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });


    const { name, email, password, error, success } = formData;

    const handleChange = name => event => {
        setFormData({ ...formData, error: false, [name]: event.target.value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, error: false });
        signUp({ name, email, password })
            .then(data => {
                if (data.error) {
                    setFormData({ ...formData, error: data.error, success: false });
                } else {
                    setFormData({
                        ...formData,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    });
                }
            });
    }



    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Sign up successfull! <Link to='/signin'>Sign in.</Link>
        </div>
    )

    const signUpForm = () => (
        <form form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} onChange={handleChange('name')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} onChange={handleChange('email')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} onChange={handleChange('password')} className="form-control" />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form >
    )


    return (
        <Layout title="Sign Up" description="Node React E-commerce App" className="container col-md-4 offset-md-4">
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup;

