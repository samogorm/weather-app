import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner';
import { getLocation, getWeatherConditions } from './constants/APIHelpers';
import { Geolocation } from './components/geolocation/Geolocation';
import { SmallHeading } from './components/small-heading/SmallHeading';
import { SearchWrapper } from './components/search-wrapper/SearchWrapper';
import { WeatherCard } from './components/weather-card/WeatherCard';
import { WeatherIcons } from './constants/WeatherIcons';
import { getWeatherConditionsLocalStorage } from './constants/LocalStorage';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.scss';

export const App = () => {
  const [currentLocation, setCurrentLocation] = useState({ name: 'Manchester', country: 'GB', key: '329260' });
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState(null);
  const [otherWeatherConditions, setOtherWeatherConditions] = useState(getWeatherConditionsLocalStorage());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
         type="current"
       />
     )
    }

    return (
      <Loader
        type="ThreeDots"
        color="#fe7"
        height={50}
        width={50}
        timeout={3000} //3 secs

      />
    );
  }

  const getWeatherIconFileName = (iconKey) => {
    let icon = WeatherIcons.find(icon => icon.id === iconKey);

    if(icon !== null && icon !== undefined) return icon.filename;
    else return '1-sunny.svg';
  }

  const renderOtherWeatherConditions = () => {
    if (otherWeatherConditions !== null && otherWeatherConditions.length > 0) {
      return otherWeatherConditions.map((condition, index) => {
        return (
          <WeatherCard 
            key={`weather-card-${index}`}
            index={index}
            temperature={condition.weather[0].Temperature.Metric.Value}
            title={`${condition.location.name}, ${condition.location.country}`}
            subtitle={condition.weather[0].WeatherText}
            icon={getWeatherIconFileName(condition.weather[0].WeatherIcon)}
            type="other"
            setWeatherConditions={(values) => setOtherWeatherConditions(values)}
          />
        )
      })
    }

    return 'You have not added any other locations yet.'
  }

  return(
    <div className="app">
      <Geolocation
        currentPosition={updateCurrentPosition}
      />

      <section className="app__current-location">
        <SmallHeading value="Current Location" />
        {renderCurrentWeatherCard()}
      </section>

      <section className="app__add-location">
       <div className="add-wrapper">
          <button id="add-location-button" type="button" className={isSearchOpen ? 'button button--red' : 'button button--yellow'} onClick={() => setIsSearchOpen(!isSearchOpen)}>
            {isSearchOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faPlus} />}
            <span>{isSearchOpen ? 'Cancel' : 'Add Location'}</span>
          </button>
          {isSearchOpen ? <SearchWrapper getWeatherConditions={(value) => setOtherWeatherConditions(value)} setIsSearchOpen={(value) => setIsSearchOpen(value)} /> : null}
       </div>
      </section>

      <section className="app__other-locations">
        <SmallHeading value="Other Locations" />
        <div className="app__other-locations__cards">
          {renderOtherWeatherConditions()}
        </div>
      </section>
    </div>
  );
}