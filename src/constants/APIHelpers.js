import { apiKey, apiUrls } from './api';

/**
 * Gets the location data.
 * 
 * @param {*} location 
 * @param {*} geoposition 
 */
export const getLocation = async (location, geoposition = false) => {
    location = geoposition ? `${location.latitude}, ${location.longitude}` : location;

    const query = `?apikey=${apiKey}&q=${location}`;
    const url = `${apiUrls.locations}${geoposition ? 'geoposition/search' : 'search'}${query}`;
    const response = await fetch(url);

    return await response.json();
}

/**
 * Get the current weather conditions for the location.
 * 
 * @param {*} locationKey 
 */
export const getWeatherConditions = async (locationKey) => {
    const query = `?apikey=${apiKey}`;
    const response = await fetch(`${apiUrls.currentConditions}${locationKey}${query}`);

    return await response.json();
}