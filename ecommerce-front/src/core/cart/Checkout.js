import React, { useState, useEffect } from 'react'
import Layout from '../Layout';



const Checkout = ({ products }) => {

    const getTotal = () => {
        return products.reduce((accumulator, nextValue) => {
            return accumulator + nextValue.count * nextValue.price
        }, 0);
    }



    return (
        <div>
            <h2 className="">Total: {getTotal()}</h2>
        </div>
    )
}

export default Checkout
