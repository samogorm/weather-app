import React, { useEffect, useState } from 'react';

export const Geolocation = (props) => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count === 0) return getCurrentPositionOfUser();
        else return function(){};
    });

    const passValueBackToParent = (value) => props.currentPosition(value);

    /**
     * Gets the current position of the user.
     * 
     * @return {Object} returns information about the location.
     */
    const getCurrentPositionOfUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocationDetails, hasError);
        } else {
            let result = {
                success: false,
                message: null,
                data: null
            }

            passValueBackToParent(result);
            setCurrentPosition(result);

            return false;
        }
    }

    /**
     * This will return the longitude and latitude of the position.
     * @param {*} position 
     * 
     * @return {Object} details of the location.
     */
    const getLocationDetails = (position) => {
        let result = {
            success: true,
            message: null,
            data: {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            }
        }
        setCount(count+1);
        passValueBackToParent(result);
        setCurrentPosition(result);

        return result;
    }

    /**
     * This will return an object containing the error details.
     * @param {*} error 
     * 
     * @return {Object} Details of the error.
     */
    const hasError = (error) => {
        let result = {
            success: false,
            message: error.message,
            data: null
        }

        passValueBackToParent(result);
        setCurrentPosition(result);

        return result;
    }

    return (<div></div>);
}