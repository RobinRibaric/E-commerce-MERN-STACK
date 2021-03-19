import React from 'react'

const RadioBox = ({ prices, handleFilters }) => {
    //const [value, setValue] = useState(0);

    const handleChange = (e) => {
        handleFilters(prices[e.target.value].array);
        //setValue(e.target.value);
    }

    return prices.map((price, i) => (
        <div key={i} className="prices-list">
            <input onChange={handleChange} name={price} value={`${price._id}`} className="mr-2 ml-4 price-radio" type="radio" />
            <label className="form-check-label" for="">{price.name}</label>
        </div>
    ));
}

export default RadioBox





