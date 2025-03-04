import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { usePlacesContext } from "../../context/PlacesContext";
import findPath from '../../services/findPath';

const MapComponent = () => {
    const { places, placeClicked, setPlaceClicked } = usePlacesContext();
    const singaporeCentre = [1.3521, 103.8198];
    
    const mapRefs = useRef([]);
    
    const [route, setRoute] = useState(null);

    useEffect(() => {
        if (placeClicked !== null && mapRefs.current[placeClicked]) {
            mapRefs.current[placeClicked].openPopup();
        }
    }, [placeClicked]);

    return (
        <MapContainer center={singaporeCentre} zoom={11} style={{ height: '450px', width: '450px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places?.map((place, index) => (
                <Marker
                    key={index}
                    position={[place?.lat, place?.lng]}
                    ref={(el) => (mapRefs.current[index] = el)}
                    eventHandlers={{
                        click: () => {
                            setPlaceClicked(index);
                        },
                    }}
                >
                    <Popup>
                        <p>{place?.name}</p>
                        <Button onClick={() => findPath([place?.lng, place?.lat], setRoute, 'cycling-regular')}>
                            Find Cycling Path
                        </Button>
                        <Button onClick={() => findPath([place?.lng, place?.lat], setRoute, 'driving-car')}>
                            Find Driving Path
                        </Button>
                        <Button onClick={() => findPath([place?.lng, place?.lat], setRoute, 'foot-walking')}>
                            Find Walking Path
                        </Button>
                    </Popup>
                </Marker>
            ))}
            {route && <Polyline positions={route} color="blue" />}
        </MapContainer>
    );
};

export default MapComponent;