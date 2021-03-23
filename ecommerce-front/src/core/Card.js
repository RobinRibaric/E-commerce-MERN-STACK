import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cart/cartHelpers';
import { updateLocale } from 'moment';

const Card = ({ product, showViewProduct = true,
    customClass,
    showAddToCart = true,
    cartUpdate = false,
    showRemoveBtn = false,
    removeFromCart
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = () => {
        if (showViewProduct) return <Link to={`/product/${product._id}`} className="mr-3"><button class="btn btn-outline-primary mt-2 mb-2 card-btn">View Product</button></Link>
    }

    const showAddToCartButton = () => {
        if (showAddToCart) return <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 ml-3">Add to Cart</button>
    }

    const showRemoveFromCart = () => {
        if (showRemoveBtn) return <button onClick={() => {
            /* removeFromCart(product._id); */

            removeItem(product._id);
        }} className="btn btn-outline-danger mt-2 mb-2 ml-3">Remove</button>
    }


    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    }

    const shouldRedirect = () => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>)
            :
            (<span className="badge badge-danger badge-pill">Out of Stock</span>)
    }

    const handleChange = e => {
        setCount(e.target.value < 1 ? 1 : e.target.value);
        console.log('changing')
        if (e.target.value >= 1) {
            updateItem(product._Id, e.target.value);
        }
    }

    const showCartUpdateOptions = () => {
        return cartUpdate && <div>
            <div className="input-group mb-3 itemQuantity">
                <div className="input-group-prepend">
                    <span className="input-group-text">Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange} />
            </div>
        </div>
    }



    return (
        <div className={customClass}>
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect()}
                    <ShowImage item={product} url="products" />
                    <p className="lead mt-2">{product.description?.substring(0, 100)}</p>
                    <p className="black-10">{product.price}$</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)}
                    <br />
                    {showViewButton()}
                    {showAddToCartButton()}
                    {showRemoveFromCart()}
                    {showCartUpdateOptions()}
                </div>
            </div>
        </div>
    )
}

export default Card
