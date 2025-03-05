import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { usePlacesContext } from "../../context/PlacesContext";
import findPath from '../../services/findPath';
import blueIcon from './blueIcon';

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
        <MapContainer 
            center={singaporeCentre} 
            zoom={11} 
            style={{ width: '100vw', height: '100vh' }} // Ensures full height
        >
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
                    icon={blueIcon}
                >
                    <Popup>
                        <p>{place?.name}</p>
                        <ButtonGroup>
                            <Button onClick={() => findPath([place?.lng, place?.lat], setRoute, 'cycling-regular')}>
                                Find Cycling Path
                            </Button>
                            <Button onClick={() => findPath([place?.lng, place?.lat], setRoute, 'driving-car')}>
                                Find Driving Path
                            </Button>
                            <Button onClick={() => findPath([place?.lng, place?.lat], setRoute, 'foot-walking')}>
                                Find Walking Path
                            </Button>
                        </ButtonGroup>
                    </Popup>
                </Marker>
            ))}
            {route && <Polyline positions={route} color="blue" />}
        </MapContainer>
    );
};

export default MapComponent;
