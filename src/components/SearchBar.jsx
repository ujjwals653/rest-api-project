import { useState } from "react";

const SearchBar = ({setSearchTerm}) => {

    function handleChange(value) {
        setSearchTerm(value);
    }

    return(
        <>
        <div className="search-bar">
            <h1>Search for a Country</h1>
            <input
                type="text"
                placeholder="Enter country name"
                id='search'
                name='search'
                onChange={(e)=> handleChange(e.target.value)}/>
        </div>
        </>
    )
}

export default SearchBar