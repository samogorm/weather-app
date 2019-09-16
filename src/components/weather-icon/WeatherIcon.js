import React from 'react';
import './WeatherIcon.scss';

export const WeatherIcon = props => {
    let imagePath = require(`./../../assets/icons/${props.filename}`);

    return (
        <img className="weather-icon" src={imagePath} />
    )
}