import React from 'react';
import './WeatherIcon.scss';

export const WeatherIcon = props => {
    let imagePath = require(`./../../assets/weather-icons/${props.filename}`);

    return (
        <img className="weather-icon" src={imagePath} alt={`${props.alt}`}/>
    )
}