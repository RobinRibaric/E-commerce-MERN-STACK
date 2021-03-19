import React, { useState } from 'react'
import Layout from '../core/Layout';
import { Redirect } from 'react-router-dom';
import { signIn, authenticate, isAuthenticated } from '../auth';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: 'walla@gmail.com',
        password: 'walla123',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });


    const { email, password, error, loading, redirectToReferrer } = formData;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setFormData({ ...formData, error: false, [name]: event.target.value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, error: false, loading: true });
        signIn({ email, password })
            .then(data => {
                if (data.error) {
                    setFormData({ ...formData, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setFormData({
                            ...formData,
                            redirectToReferrer: true,
                        });
                    });
                }
            });
    }



    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    const showLoading = () => loading && (

        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/home" />
        }
    }

    const signInForm = () => (
        <form form >
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
        <Layout title="Sign In" description="Node React E-commerce App" className="container col-md-4 offset-md-4">
            {showError()}
            {showLoading()}
            {redirectUser()}
            {signInForm()}
        </Layout>
    )
}

export default SignIn
