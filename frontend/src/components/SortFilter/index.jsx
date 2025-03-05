import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { places, prices, ratings, townCoordinates } from "../../content";
import { usePlacesContext } from "../../context/PlacesContext";
import getPlaces from "../../services/getPlaces";

const SortFilter = () => {
    const [formData, setFormData] = useState({
        town: '',
        placeType: '',
        maxPrice: '',
        minRating: ''
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: 'inherit', // Inherit the color from the parent box
            '& .MuiOutlinedInput-root': {
                color: 'inherit', // Applies the same color to the text
                '& fieldset': {
                    borderColor: 'currentColor', // Matches outline color to the text color
                },
                '&:hover fieldset': {
                    borderColor: 'currentColor', // Ensure hover keeps the same color
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'currentColor', // Outline remains consistent on focus
                },
            },
        }}>
            <h2>Search Places</h2>
            <FormControl fullWidth>
                <InputLabel
                    sx={{
                        color: 'inherit', // Inherits the parent's color
                        '&.Mui-focused': {
                            color: 'inherit', // Ensures it stays consistent when focused
                        },
                    }}
                >Town</InputLabel>
                <Select
                    value={formData.town}
                    label="Town"
                    onChange={(e) => handleChange(e, "town")}
                >
                    {Object.keys(townCoordinates).map((town) => (
                        <MenuItem key={town} value={town}>{town}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel
                    sx={{
                        color: 'inherit', // Inherits the parent's color
                        '&.Mui-focused': {
                            color: 'inherit', // Ensures it stays consistent when focused
                        },
                    }}
                >Place</InputLabel>
                <Select
                    value={formData.placeType}
                    label="Place"
                    onChange={(e) => handleChange(e, "placeType")}
                >
                    {Object.keys(places).map((place) => (
                        <MenuItem key={place} value={places[place]}>{place}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel
                    sx={{
                        color: 'inherit', // Inherits the parent's color
                        '&.Mui-focused': {
                            color: 'inherit', // Ensures it stays consistent when focused
                        },
                    }}
                >Max Price</InputLabel>
                <Select
                    value={formData.maxPrice}
                    label="Max Price"
                    onChange={(e) => handleChange(e, "maxPrice")}
                >
                    {Object.keys(prices).map((price) => (
                        <MenuItem key={price} value={prices[price]}>{price}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel
                    sx={{
                        color: 'inherit', // Inherits the parent's color
                        '&.Mui-focused': {
                            color: 'inherit', // Ensures it stays consistent when focused
                        },
                    }}
                >Min Rating</InputLabel>
                <Select
                    value={formData.minRating}
                    label="Min Rating"
                    onChange={(e) => handleChange(e, "minRating")}
                >
                    {Object.keys(ratings).map((rating) => (
                        <MenuItem key={rating} value={ratings[rating]}>{rating}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={onSearch} style={{ alignSelf: 'stretch' }}>Search</Button>
        </Box>
    );
};

export default SortFilter;