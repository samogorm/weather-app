import React from 'react';
import './SearchResults.scss';
import { SmallHeading } from '../small-heading/SmallHeading';
import { Subtitle } from './../subtitle/Subtitle';

export const SearchResults = props => {
    const passSelectedResultToParent = (values) => props.getSelectedResult(values);
    
    const renderSearchResults = () => {
        if(props.results.length > 0) {
            return props.results.map(result => {
                return (
                    <li id={result.Key} key={result.Key} onClick={() => {
                        let selected = { name: result.EnglishName, country: result.Country.ID, key: result.Key };
                        passSelectedResultToParent(selected);
                    }}>
                        <SmallHeading value={result.EnglishName} />
                        <Subtitle value={`${result.EnglishName}, ${result.Country.ID}`} />
                        <Subtitle value={result.Region.EnglishName} />
                    </li>
                )
            });
        }

        return 'No results found.';
    }

    return (
        <ul className="search-results">
           {renderSearchResults()}
        </ul>
    );
}