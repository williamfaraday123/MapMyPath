import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";

const SearchResults = () => {
    return (
        <Container fluid>
            <Row className="g-0">
                <Col xs={12} md={4} className="overflow-auto vh-100" style={{ maxHeight: "100vh" }}>
                    <ListComponent />
                </Col>
                {/* Right: Fixed map (only fixed on larger screens) */}
                <Col xs={12} md={8} className="vh-100 d-md-block d-none position-fixed end-0">
                    <MapComponent />
                </Col>

                {/* Separate map for mobile (stacks below list) */}
                <Col xs={12} className="d-md-none" style={{ height: "50vh" }}>
                    <MapComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default SearchResults;
