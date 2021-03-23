import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getProducts, getProduct, getRelatedProducts } from './apiCore';
import Card from './Card';


const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    const loadSingleProduct = (productId) => {
        getProduct(productId).then(res => {
            if (res.error) {
                setError(res.error);
            } else {
                setProduct(res);
                getRelatedProducts(productId).then(res => {
                    if (res.error) {
                        setError(res.error);
                    } else {
                        setRelatedProducts([...res]);
                    }
                });
            }
        });
    }

    return (
        <Layout title={product && product.name} description={product && product.description} className="container-fluid">
            <div className="row">
                <div className="col-8">
                    {product && <Card product={product} showViewProduct={false} customClass="col-8 mb-3" />}
                </div>
                <div className="col-4 ">
                    <h2>Related Products</h2>
                    {relatedProducts.map((product, i) => (
                        <div className="mb-3 related-products">
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product
