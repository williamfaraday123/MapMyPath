import axios from 'axios';

const placeDetails = async (place_id) => {
    const options = {
    method: 'GET',
    url: `https://google-map-places-new-v2.p.rapidapi.com/v1/places/${place_id}`,
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'google-map-places-new-v2.p.rapidapi.com',
        'X-Goog-FieldMask': '*'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

export default placeDetails;