import React, {useState} from 'react';
import './WeatherCard.scss';
import { SmallHeading } from '../small-heading/SmallHeading';
import { Subtitle } from '../subtitle/Subtitle';
import { WeatherIcon } from '../weather-icon/WeatherIcon';
import { Temperature } from '../temperature/Temperature';

export const WeatherCard = props => {

    return(
        <article className="weather-card">
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
           </div>
        </article>
    )
}