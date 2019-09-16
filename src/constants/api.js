// We know this should be protected.
export const apiKey = process.env.REACT_APP_API_KEY;
export const apiUrls = {
    locations: 'http://dataservice.accuweather.com/locations/v1/cities/search',
    currentConditions: 'http://dataservice.accuweather.com/currentconditions/v1/329260'
};