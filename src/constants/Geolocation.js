/**
 * Gets the current location of the user.
 * 
 * @return {Object} returns information about the location.
 */
export const getCurrentLocationOfUser = () => {
    if(navigator.geolocation) {
        let result = navigator.geolocation.getCurrentPosition(getLocationDetails, hasError);
        console.log("result: ", result);
        return result;
    } else {
        return {
            success: false,
            message: null,
            data: null
        }
    }
}

/**
 * This will return the longitude and latitude of the position.
 * @param {*} position 
 * 
 * @return {Object} details of the location.
 */
const getLocationDetails = (position) => {
    return {
        success: true,
        message: null,
        data: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }
    }
}

/**
 * This will return an object containing the error details.
 * @param {*} error 
 * 
 * @return {Object} Details of the error.
 */
const hasError = (error) => {
    return {
        success: false,
        message: error.message,
        data: null
    }
} 