import { Col, Container, Row } from "react-bootstrap/lib/Tab";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";
const SearchResults = () => {
    return (
        <Container>
            <Row>
                <Col style={{
                    overflowY: "auto"
                }}>
                    <ListComponent />
                </Col>
                <Col>
                    <MapComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default SearchResults;