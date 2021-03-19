import React from 'react'
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({ product }) => {
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{product.name}</div>
                <ShowImage item={product} url="products" />
                <div className="card-body">
                    <p>{product.description}</p>
                    <p>{product.price}$</p>
                    <Link to="/" className="mr-3"><button class="btn btn-outline-primary mt-2 mb-2 card-btn">View Product</button></Link>
                    <button className="btn btn-outline-warning mt-2 mb-2 ml-3">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card
