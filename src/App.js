import React, { useState, useEffect } from 'react';
import { getLocation, getWeatherConditions } from './constants/APIHelpers';
import { Geolocation } from './components/geolocation/Geolocation';
import { SmallHeading } from './components/small-heading/SmallHeading';
import { SearchWrapper } from './components/search-wrapper/SearchWrapper';
import { WeatherCard } from './components/weather-card/WeatherCard';
import { WeatherIcons } from './constants/WeatherIcons';

import './App.scss';

export const App = () => {
  const [currentLocation, setCurrentLocation] = useState({ name: 'Manchester', country: 'GB', key: '329260' });
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState(null);
  const [otherWeatherConditions, setOtherWeatherConditions] = useState([]);

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

  const renderCurrentWeatherCard = () => {
    if(currentWeatherConditions !== null) {
     return (
       <WeatherCard
         temperature={currentWeatherConditions[0].Temperature.Metric.Value}
         title={`${currentLocation.name}, ${currentLocation.country}`}
         subtitle={currentWeatherConditions[0].WeatherText}
         icon={getWeatherIconFileName(currentWeatherConditions[0].WeatherIcon)}
       />
     )
    }

    return null;
  }

  const getWeatherIconFileName = (iconKey) => {
    let icon = WeatherIcons.find(icon => icon.id === iconKey);
    return icon.filename;
  }

  return(
    <div className="app">
      <Geolocation
        currentPosition={updateCurrentPosition}
      />

      <div className="app__current-location">
        <SmallHeading value="Current Location" />
        {renderCurrentWeatherCard()}
      </div>


      <SearchWrapper />
    </div>
  );
}