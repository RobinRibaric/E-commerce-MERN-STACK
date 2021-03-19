import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';
import { getCategories } from '../core/apiCore';


const AddProduct = () => {

    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: '',
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: '',
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData } = values;


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, categories: data, formData: new FormData() });
            }
        });
    }

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        console.log(formData);
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData)
            .then(res => {
                if (res.error) {
                    setValues({ ...values, error: res.error, createdProduct: false });
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        shipping: '',
                        quantity: '',
                        photo: '',
                        loading: false,
                        createdProduct: res.name,
                        formData: new FormData(),
                    })
                }
            })
    }

    const newPostForm = () => (
        <form action="" class="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label for="" className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label for="" className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label for="" className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="text" className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label for="" className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control" >
                    <option>Please select</option>
                    {categories && categories.map((category, i) => (<option value={category._id} key={i}>{category.name}</option>))}
                </select >
            </div>
            <div className="form-group">
                <label for="" className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control" >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select >
            </div>
            <div className="form-group">
                <label for="" className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary mt-3">Create Product</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}> {error}</div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct} was created!`}</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )

    return (
        <Layout title="Add new product" description="Create a new product" className="container col-md-4 offset-md-4">
            <div className="row">
                {showError()}
                {showSuccess()}
                {showLoading()}
                {newPostForm()}
            </div>
        </Layout>
    )
}

export default AddProduct;

