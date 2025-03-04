import openrouteservice from 'openrouteservice-js';

const findPath = async (destination, setRoute, transportMode) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const userLocation = [position.coords.longitude, position.coords.latitude];
            const client = new openrouteservice.Directions({
                api_key: import.meta.env.VITE_OPENROUTESERVICE_API_KEY
            });

            try {
                const response = await client.calculate({
                    coordinates: [userLocation, destination],
                    profile: transportMode,
                    format: 'geojson'
                });
                console.log(response);
                setRoute(response.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]));
            } catch (err) {
                alert(`Error fetching route: ${err.message}`);
                console.log(err)
            }
        })
    } else {
        alert('Geolocation is not supported by this browser');
    }
};

export default findPath;