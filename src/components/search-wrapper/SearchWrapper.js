import React, { useState, useEffect } from 'react';
import { SearchBar } from './../search-bar/SearchBar';
import { SearchResults } from '../search-results/SearchResults';
import { getWeatherConditions } from './../../constants/APIHelpers';
import { setWeatherConditionsLocalStorage, getWeatherConditionsLocalStorage } from './../../constants/LocalStorage';

import './SearchWrapper.scss';

export const SearchWrapper = props => {
    const [searchResults, setSearchResults] = useState([]);
    const [isResultsOpen, setIsResultsOpen] = useState(false);

    const getSelectedWeatherConditions = (location) => getWeatherConditions(location.key).then(data => {
        let weatherCondition = {
            location: location,
            weather: data
        }

        let weatherConditions = getWeatherConditionsLocalStorage();

        if(weatherConditions !== null) weatherConditions.push(weatherCondition);
        else weatherConditions = [weatherCondition];

        setWeatherConditionsLocalStorage(weatherConditions);

        // pass this value up to the app.js component
        props.getWeatherConditions(weatherConditions);
        props.setIsSearchOpen(false);
    });

    useEffect(() => {
    }, [searchResults])

    return (
        <div className="search-wrapper">
            <SearchBar
                searchLabel="Enter city name..."
                getSearchResults={(value) => {
                    setSearchResults(value);
                    setIsResultsOpen(true);
                }}
            />
            { 
                isResultsOpen ? 
                <SearchResults
                    results={searchResults}
                    getSelectedResult={(values) => getSelectedWeatherConditions(values)}
                /> 
                : null 
            }
        </div>
    );
}