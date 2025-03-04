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
                            {/* <ImageComponent place_id={place?.id}/> */}
                            <Card.Body>
                                <Card.Title>{place?.name}</Card.Title>
                                <Card.Text>Address: {place?.address}</Card.Text>
                                <Card.Text>Rating: {place?.rating}</Card.Text>
                                <Card.Text>Price: {place?.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default ListComponent;