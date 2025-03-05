import { Col, Container, Row } from "react-bootstrap";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";
const SearchResults = () => {
    return (
        <Container fluid style={{ height: "100vh" }}>
            <Row style={{ height: "100%" }}>
                <Col style={{
                    overflowY: "auto",
                    height: "100%"
                }}>
                    <ListComponent />
                </Col>
                <Col style={{
                        height: "100%",
                        padding: 0,
                }}>
                    <MapComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default SearchResults;
