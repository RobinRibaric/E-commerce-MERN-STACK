import React from 'react'
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({ product, showViewProduct = true, customClass }) => {

    const showViewButton = () => {
        if (showViewProduct) return <Link to={`/product/${product._id}`} className="mr-3"><button class="btn btn-outline-primary mt-2 mb-2 card-btn">View Product</button></Link>
    }

    const showAddToCartButton = () => (
        <button className="btn btn-outline-warning mt-2 mb-2 ml-3">Add to Cart</button>
    )

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>)
            :
            (<span className="badge badge-danger badge-pill">Out of Stock</span>)
    }

    return (
        <div className={customClass}>
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <ShowImage item={product} url="products" />
                <div className="card-body">
                    <p className="lead mt-2">{product.description?.substring(0, 100)}</p>
                    <p className="black-10">{product.price}$</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)}
                    <br />
                    {showViewButton()}
                    {showAddToCartButton()}
                </div>
            </div>
        </div>
    )
}

export default Card
