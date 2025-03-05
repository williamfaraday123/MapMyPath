import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
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
                            <DropdownButton title="Cycle">
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'cycling-regular')}>Regular Cycling</Dropdown.Item>
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'cycling-road')}>Road Cycling</Dropdown.Item>
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'cycling-mountain')}>Mountain Bike</Dropdown.Item>
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'cycling-electric')}>Electric Bike</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton title="Drive">
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'driving-car')}>Car</Dropdown.Item>
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'driving-hgv')}>Heavy Goods Vehicle</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton title="Walk">
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'foot-walking')}>Pavement</Dropdown.Item>
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'foot-hiking')}>Hiking</Dropdown.Item>
                                <Dropdown.Item onClick={() => findPath([place?.lng, place?.lat], setRoute, 'wheelchair')}>wheelchair</Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                    </Popup>
                </Marker>
            ))}
            {route && <Polyline positions={route} color="blue" />}
        </MapContainer>
    );
};

export default MapComponent;
