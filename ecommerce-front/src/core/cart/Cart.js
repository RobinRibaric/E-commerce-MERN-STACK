import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Card from '../Card';
import { getCart, updateItem } from './cartHelpers';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(getCart());
    }, []);

    const showProducts = () => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card key={i} product={product} showAddToCart={false} cartUpdate={true} showRemoveBtn={true} removeFromCart={removeFromCart} />
                ))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>Your cart is empty. <hr /> <Link to="/shop">Continue shopping</Link> </h2>
    )

    const removeFromCart = (productId) => {
        const products = [...items];

        products.map((product, i) => {
            if (product._id === productId) {
                products.splice(i, 1);
            }
        });

        setItems(products);
    }


    return (
        <Layout title="Shopping Cart" description="Manage your cart items. Add, remove, checkout or continue shopping!" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showProducts() : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart
