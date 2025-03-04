import axios from 'axios';

const nearbySearch = async (lat, lng, radius, placeType, maxPrice) => {
    const options = {
      method: 'GET',
      url: 'https://google-map-places.p.rapidapi.com/maps/api/place/nearbysearch/json',
      params: {
        location: `${lat},${lng}`,
        radius: `${radius}`,
        language: 'en',
        opennow: 'true',
        rankby: 'prominence',
        type: placeType,
        maxprice: maxPrice,
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response);
        const { data: { results } } = response;
        console.log(results);
        const places = results?.map(result => ({
          id: result?.place_id,
          name: result?.name,
          address: result?.vicinity,
          rating: result?.rating,
          price: result?.price_level,
          lat: result?.geometry?.location?.lat,
          lng: result?.geometry?.location?.lng,
          image: result?.photos[0]?.photo_reference
        }));
        return places;
    } catch (error) {
        throw error;
    }
};

export default nearbySearch;