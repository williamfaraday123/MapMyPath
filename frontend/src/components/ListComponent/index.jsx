import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useRef } from "react";
import { Card, ListGroup } from 'react-bootstrap';
import { usePlacesContext } from "../../context/PlacesContext";
import SortFilter from "../../pages/SortFilter";

const ListComponent = () => {
    const { places, placeClicked, setPlaceClicked } = usePlacesContext();
    const listRefs = useRef([]);

    useEffect(() => {
        if (placeClicked !== null && listRefs.current[placeClicked])
            listRefs.current[placeClicked].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [placeClicked]);

    return (
        <div>
            <SortFilter />
            {places.length == 0 && <div>No places found</div>}
            <ListGroup>
                {places?.map((place, index) => (
                    <ListGroup.Item
                        key={index}
                        ref = {el => listRefs.current[index] = el}
                        onClick = {() => setPlaceClicked(index)}
                        active = {placeClicked === index}
                    >
                        <Card
                            style={{ width: '18rem' }}
                        >
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place?.image}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`} alt="image cannot be displayed"></img>
                            <Card.Body>
                                <Card.Title>{place?.name}</Card.Title>
                                <Card.Text>{"⭐".repeat(place?.rating)}</Card.Text>
                                <Card.Text style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Price</span>
                                    <span>{"$".repeat(place?.price)}</span>
                                </Card.Text>
                                <Card.Text style={{ display: "flex", justifyContent: "space-between" }}>
                                    <img 
                                        src={`https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png`}
                                        style={{ height: "1.3em", width: "auto" }}
                                    ></img>
                                    <span>{place?.address}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default ListComponent;
