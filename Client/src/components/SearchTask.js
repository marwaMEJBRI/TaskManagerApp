import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchTask = () => {
    
const [searchValue, setSearchValue] = useState('');
const [search, setSearch] = useState([]);

const rechercheDescription = async (e) => {
    if (e) {
        e.preventDefault();
    }
    try {
        const response = await axios.get(`http://localhost:5000/searchTask/${searchValue}`);
        setSearch(response.data);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    if (searchValue.length >= 1) {
        rechercheDescription();
    } else {
        setSearch([]);
    }
}, [searchValue]);

    return (
    <div>
        <form className="mt-3" onSubmit={(e) => rechercheDescription(e)}>
            <input type="text" className="form-control" placeholder="Search here" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button className="btn btn-success mt-3">
                Search Task
            </button>
        </form>
        {search.map((data, index) => {
            return (
                <div key={index}>
                    {data.description}
                </div>
            );
        })}
    </div>
    )
}

export default SearchTask