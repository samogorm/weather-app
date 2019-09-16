import React, {useState} from 'react';
import { getLocation, getWeatherConditions } from './../../constants/APIHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './../button/Button.scss';
import './SearchBar.scss';

export const SearchBar = props => {
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const passSearchResultsToParent = () => props.searchResults(searchResults);

    return(
        <div className="search-bar">
            <input 
                id="search-bar" 
                name="search" 
                placeholder={props.searchLabel} 
                onBlur={(event) => setSearchTerm(event.target.value)} 
            />
            <button 
                id="search-bar-button" 
                type="button" 
                className="button button--yellow"
                onClick={() => getLocation(searchTerm).then((data) => {
                    setSearchResults(data);
                    passSearchResultsToParent();
                })}
            >
                <FontAwesomeIcon icon={faSearch} />
                <span>Find</span>
            </button>
        </div>
    );
}