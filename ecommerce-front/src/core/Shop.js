import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] },
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(7);
    const [filteredResults, setFitleredResult] = useState({});

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
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const loadFilteredResults = (filters) => {
        getFilteredProducts(skip, limit, filters).then(res => {
            if (res.error) {
                setError(res.error);
            } else {
                setFitleredResult(res);
            }
        })
    }

    return (
        <Layout title="Shop Page" description="Node React E-commerce App" className="container-fluid">

            <div className="row">
                <div className="col-4">
                    <h4>Filter by category</h4>
                    <ul>
                        <Checkbox handleFilters={filters => handleFilters(filters, 'category')} categories={categories} />
                    </ul>
                    <h4>Filter by price</h4>
                    <div>
                        <RadioBox handleFilters={filters => handleFilters(filters, 'price')} prices={prices} />
                    </div>
                </div>
                <div className="col-8">{JSON.stringify(myFilters)}</div>
                <div className="col-8">{JSON.stringify(filteredResults)}</div>
            </div>
        </Layout>
    )
}

export default Shop
