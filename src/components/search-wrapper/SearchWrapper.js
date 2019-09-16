import React, { useState } from 'react';
import { SearchBar } from './../search-bar/SearchBar';
import { SearchResults } from '../search-results/SearchResults';
import { getWeatherConditions } from './../../constants/APIHelpers';
import { setWeatherConditionsLocalStorage } from './../../constants/LocalStorage';

import './SearchWrapper.scss';

export const SearchWrapper = props => {
    const [searchResults, setSearchResults] = useState([]);

    const getSelectedWeatherConditions = (location) => getWeatherConditions(location.key).then(data => {
        let weatherCondition = {
            location: location,
            weather: data
        }

        setWeatherConditionsLocalStorage(weatherCondition);
    });

    const renderSearchResults = () => {
        if (searchResults.length > 0) {
            return (
                <SearchResults
                    results={searchResults}
                    getSelectedResult={(values) => getSelectedWeatherConditions(values)}
                />
            )
        }
    }

    return (
        <div className="search-wrapper">
            <SearchBar
                searchLabel="Enter city name..."
                getSearchResults={(value) => setSearchResults(value)}
            />
          { renderSearchResults() }
        </div>
    );
}