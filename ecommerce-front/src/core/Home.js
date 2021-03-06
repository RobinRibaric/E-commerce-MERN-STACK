import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArival, setProductsByArival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(res => {
            if (res.error) {
                setError(res.error);
            } else {
                setProductsBySell(res)
            }
        });
    }

    const loadProductsByArival = () => {
        getProducts('createdAt').then(res => {
            if (res.error) {
                setError(res.error);
            } else {
                setProductsByArival(res);
            }
        });
    }

    useEffect(() => {
        loadProductsByArival();
        loadProductsBySell();
    }, []);

    return (
        <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">
            <Search />
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (<Card key={i} product={product} customClass="col-4 mb-3" />))}
            </div>

            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArival.map((product, i) => (<Card key={i} product={product} customClass="col-4 mb-3" />))}
            </div>
        </Layout>
    )
}

export default Home
