import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { places, prices, ratings, townCoordinates } from "../../content";
import { usePlacesContext } from "../../context/PlacesContext";
import getPlaces from "../../services/getPlaces";

const SortFilter = () => {
    const [formData, setFormData] = useState({
        town: '',
        placeType: '',
        maxPrice: 4,
        minRating: 0
    });

    const { setPlaces } = usePlacesContext();
    const navigate = useNavigate();
    
    const handleChange = async (e, field) => {
        setFormData((prevFields) => ({
            ...prevFields,
            [field]: e.target.value
        }));
    };

    const onSearch = async (e) => {
        e.preventDefault();
        console.log("Town:", formData.town, "Place:", formData.placeType, "Max Price:", formData.maxPrice, "Min rating:", formData.minRating);
        try {
            const fetchedPlaces = await getPlaces(formData);
            console.log('fetchedPlaces:', fetchedPlaces);
            setPlaces(fetchedPlaces);
            navigate('/search-results');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2>Search Places</h2>
            <div>
                <Form.Label>Town</Form.Label>
                <Form.Select value={formData.town} onChange={(e) => handleChange(e, "town")}>
                    <option value="">Select Town</option>
                    {Object.keys(townCoordinates).map((town) => (
                        <option key={town} value={town}>{town}</option>
                    ))}
                </Form.Select>
            </div>
            <div>
                <Form.Label>Place</Form.Label>
                <Form.Select value={formData.placeType} onChange={(e) => handleChange(e, "placeType")}>
                    {Object.keys(places).map((place) => (
                        <option key={place} value={places[place]}>{place}</option>
                    ))}
                </Form.Select>
            </div>
            <div>
                <Form.Label>Max Price</Form.Label>
                <Form.Select value={formData.maxPrice} onChange={(e) => handleChange(e, "maxPrice")}>
                    {Object.keys(prices).map((price) => (
                        <option key={price} value={prices[price]}>{price}</option>
                    ))}
                </Form.Select>
            </div>
            <div>
                <Form.Label>Min Rating</Form.Label>
                <Form.Select value={formData.minRating} onChange={(e) => handleChange(e, "minRating")}>
                    {Object.keys(ratings).map((rating) => (
                        <option key={rating} value={ratings[rating]}>{rating}</option>
                    ))}
                </Form.Select>
            </div>
            <Button onClick={onSearch} style={{ marginTop: "2vh" }}>Search</Button>
        </div>
    );
};

export default SortFilter;