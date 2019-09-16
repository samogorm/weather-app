import React, { useState, useEffect } from 'react';
import { getLocation, getWeatherConditions } from './constants/APIHelpers';
import { Geolocation } from './components/geolocation/Geolocation';
import './App.scss';
import { Temperature } from './components/temperature/Temperature';
import { SmallHeading } from './components/small-heading/SmallHeading';
import {Subtitle} from './components/subtitle/Subtitle';
import { WeatherIcon } from './components/weather-icon/WeatherIcon';
import { Button } from './components/button/Button';
import { faSearch, faPlus, faCross } from '@fortawesome/free-solid-svg-icons'

export const App = () => {
  const [currentLocation, setCurrentLocation] = useState({ name: 'Manchester', country: 'GB', key: '329260' });
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState(null);

  useEffect(() => {
      console.log("The location: ", currentLocation);
      console.log("The current weather is: ", currentWeatherConditions);
      return function(){};
  });

  const updateCurrentPosition = (position) => {
    if(position.success) {

      getLocation(position.data, true).then(data => {
        setCurrentLocation(
          {
            name: data.EnglishName,
            country: data.Country.ID,
            key: data.Key
          }
        )
      });

      getWeatherConditions(currentLocation.key).then(conditions => setCurrentWeatherConditions(conditions));

    }
  };

  return(
    <div className="app">
      <Temperature
        value="32"
      />
      <SmallHeading 
        value="Darwen, GB"
      />
      <Subtitle value="Sunny, partly cloudy"/>
      <WeatherIcon filename="1-sunny.svg" />
      <Button 
        type="button"
        icon={faPlus}
        label="Add Location"
        colour="yellow"
      />
      {/* <Geolocation
        currentPosition={updateCurrentPosition}
      /> */}
    </div>
  );
}