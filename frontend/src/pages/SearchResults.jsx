import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";

const SearchResults = () => {
    return (
        <Container fluid>
            <Row className="g-0">
                <Col xs={12} md={4} style={{ overflowY: "auto", minHeight: "50vh" }}>
                    <ListComponent />
                </Col>
                <Col xs={12} md={8} style={{ minHeight: "50vh" }}>
                    <MapComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default SearchResults;
