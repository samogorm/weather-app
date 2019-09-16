import { apiKey, apiUrls } from './api';

export const getLocation = async (location) => {
    const query = `?apikey=${apiKey}&q=${location}`;
    const response = await fetch(apiUrls.locations + query);

    return await response.json();
}