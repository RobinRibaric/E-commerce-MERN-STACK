import React, { useState, useEffect } from 'react'

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToogle = categoryId => () => {
        const currentCategoryIdIndex = checked.indexOf(categoryId);
        const newCheckedCategoryId = [...checked];

        if (currentCategoryIdIndex === -1) {
            newCheckedCategoryId.push(categoryId);
        } else {
            newCheckedCategoryId.splice(currentCategoryIdIndex, 1);
        }

        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categories.map((category, i) => (
        <li className="list-unstyled category-list" key={i}>
            <input onChange={handleToogle(category._id)} value={checked.indexOf(category._id)} className="form-check-input" type="checkbox" />
            <label className="form-check-label" for="">{category.name}</label>
        </li>
    ))
}

export default Checkbox
