import React, {useState, useEffect} from 'react';
import {getLocation} from './constants/APIHelpers';
import { getCurrentLocationOfUser} from './constants/Geolocation';
import './App.scss';

export const App = () => {
  const [currentLocation, setCurrentLocation] = useState('Manchester');

  useEffect(() => {
      //getLocation(currentLocation).then(data => console.log('data: ', data));
      let position = getCurrentLocationOfUser();
      return function(){};
  });

  return(
    <div className="app">
      <p>Weather App</p>
    </div>
  );

}
