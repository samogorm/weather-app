export const setWeatherConditionsLocalStorage = values => localStorage.setItem('weatherConditions', JSON.stringify(values));
export const getWeatherConditionsLocalStorage = () => JSON.parse(localStorage.getItem('weatherConditions'));