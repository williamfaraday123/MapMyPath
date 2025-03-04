import { createContext, useContext, useState } from "react";

const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
    const [places, setPlaces] = useState([]);
    const [placeClicked, setPlaceClicked] = useState(null);
    
    return (
        <PlacesContext.Provider value={{ places, setPlaces, placeClicked, setPlaceClicked }}>
            {children}
        </PlacesContext.Provider>
    );
};

export const usePlacesContext = () => useContext(PlacesContext);