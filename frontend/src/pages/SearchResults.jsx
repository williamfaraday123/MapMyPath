import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";

const SearchResults = () => {
    return (
        <div style={{ display: "flex" }}>
            <ListComponent />
            <MapComponent />
        </div>
    );
};

export default SearchResults;