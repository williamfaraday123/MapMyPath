import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";

const SearchResults = () => {
    return (
        <Container fluid style={{ height: "100vh", width: "100vw"}}>
            <Row>
                <Col md={4} style={{ overflowY: "auto", height: "100vh" }}>
                    <ListComponent />
                </Col>
                <Col md={8} style={{ height: "100vh", display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <MapComponent />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchResults;
