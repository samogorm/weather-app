import React, { useState } from 'react';
import { SearchBar } from './../search-bar/SearchBar';
import './SearchWrapper.scss';

export const SearchWrapper = props => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className="search-wrapper">
            <SearchBar
                searchLabel="Enter city name..."
                searchResults={(value) => setSearchResults(value)}
            />
        </div>
    );
}