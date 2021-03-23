import React, { useState, useEffect } from 'react'
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false,
    });

    const { categories, category, search, searched, results } = data;

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then(res => {
            if (res.error) {
                console.log(res.error);
            } else {
                setData({ ...data, categories: res });
            }
        });
    }

    const searchData = () => {
        console.log(search, category);
        if (search) {
            list({ search: search || undefined, category })
                .then(res => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        setData({ ...data, results: res, searched: true });
                    }
                })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    }

    const handleChange = name => e => {
        setData({ ...data, [name]: e.target.value, searched: false });
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        if (searched && results.length < 1) {
            return `No products found`
        }
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form action="" onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search by name" />
                    <div className="input-group-prepend">
                        <select className="btn mr-2 category-picker" onChange={handleChange('category')}>
                            <option value="All">All Categories</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="btn input-group-append" style={{ border: 'none' }}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )

    return (
        <div>
            <div className=" container mb-3 col-8 row justify-content-start">{searchForm()}</div>
            <div className=" container-fluid mb-3 cd ">{searchedProducts(results)}</div>

        </div>
    )
}

export default Search
