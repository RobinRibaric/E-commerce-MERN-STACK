import { API } from '../config';
import queryString from 'query-string';


export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET',
    })
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const list = params => {
    const query = queryString.stringify(params);
    console.log('query', query);
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
    })
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {

    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skip, limit, filters }),
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export const getRelatedProducts = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .catch(err => console.log(err));
};
