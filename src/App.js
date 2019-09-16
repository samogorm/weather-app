import React, { useState, useEffect } from 'react';
import { getLocation, getWeatherConditions } from './constants/APIHelpers';
import { Geolocation } from './components/geolocation/Geolocation';
import './App.scss';

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
      <p>Weather App</p>
      {/* <Geolocation
        currentPosition={updateCurrentPosition}
      /> */}
    </div>
  );
}