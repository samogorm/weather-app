import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes } from '@fortawesome/free-solid-svg-icons'
import { SmallHeading } from '../small-heading/SmallHeading';
import { Subtitle } from '../subtitle/Subtitle';
import { WeatherIcon } from '../weather-icon/WeatherIcon';
import { Temperature } from '../temperature/Temperature';
import { getWeatherConditionsLocalStorage, setWeatherConditionsLocalStorage } from './../../constants/LocalStorage';

import './WeatherCard.scss';

export const WeatherCard = props => {
    const removeWeatherCard = (target) => {
        let weatherConditions = getWeatherConditionsLocalStorage();
        let index = target.getAttribute('data-remove');

        weatherConditions.splice(index, 1);

        // update the localstorage.
        setWeatherConditionsLocalStorage(weatherConditions);

        // pass this up to parent component.
        props.setWeatherConditions(weatherConditions);

    }

    return(
        <article id={props.index} className={props.type === 'other' ? 'weather-card weather-card__other' : 'weather-card'}>
            <div className="weather-card__body">
                <div className="weather-card__weather_info">
                    <SmallHeading value={props.title} />
                    <Subtitle value={props.subtitle} />
                    <Temperature value={props.temperature} />
                </div>
                <div className="weather-card__icon">
                    <WeatherIcon
                        filename={props.icon}
                    />
                </div>
                {props.type === 'other' ? 
                    <button id="remove-card" type="button" data-remove={props.index} className="button button--red remove-btn" onClick={(e) => removeWeatherCard(e.target)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button> 
                    : null 
                }
           </div>
        </article>
    )
}