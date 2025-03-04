import nearbySearch from "../api/nearbySearch";
import { townCoordinates, townRadius } from "../content";

const getPlaces = async (formData) => {
    try {
        const { town, placeType, maxPrice, minRating } = formData;
        const { lat, lng } = townCoordinates[town];
        const radius = townRadius[town];
        let places = await nearbySearch(lat, lng, radius, placeType, maxPrice);

        let placesFilteredByRating = places?.filter((eachPlace) => eachPlace.rating >= minRating);
        return placesFilteredByRating;
    } catch (err) {
        console.error('Error in /frontend/src/services/getPlaces:', err.message);
        throw err;
    }
};

export default getPlaces;