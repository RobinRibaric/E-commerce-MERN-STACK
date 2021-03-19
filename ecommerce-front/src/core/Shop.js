import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';
import { prices } from './fixedPrices';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] },
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data);
            }
        });
    }

    useEffect(() => {
        init();
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters);
    }

    return (
        <Layout title="Shop Page" description="Node React E-commerce App" className="container-fluid">

            <div className="row">
                <div className="col-4">
                    <h4>Filter by category</h4>
                    <ul>
                        <Checkbox handleFilters={filters => handleFilters(filters, 'category')} categories={categories} />
                    </ul>
                </div>
                <div className="col-8">{JSON.stringify(myFilters)}</div>
            </div>
        </Layout>
    )
}

export default Shop
