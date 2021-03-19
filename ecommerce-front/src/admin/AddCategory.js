import React, { useState } from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError(false)
        setName(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        createCategory(user._id, token, { name })
            .then(data => {
                console.log(data);
                if (data.error) {
                    setSuccess(false);
                    setError(true);
                } else {
                    setError(false);
                    setSuccess(true);
                }
            });
    }

    const showSuccess = () => {
        if (success) return <h3 class="text-success">{name} category is created</h3>
    }

    const showError = () => {
        if (error) return <h3 class="text-danger">Category name should be unique, try again!</h3>
    }
    const goBack = () => (
        <div class="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    )

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div class="form-group">
                <label for="" class="text-muted">Name</label>
                <input type="text" class="form-control" onChange={handleChange} value={name} autoFocus required />
            </div>
            <button class="btn btn-outline-primary mt-3">Create Category</button>
        </form>
    )

    return (
        <Layout title="Add new cateogry" description="Create a new category" className="container col-md-4 offset-md-4">
            <div className="row">
                {showError()}
                {showSuccess()}
                <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
                {goBack()}
            </div>
        </Layout>
    )
}

export default AddCategory
