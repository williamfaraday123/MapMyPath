import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Col, Container, Row, Alert, Button } from "react-bootstrap";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";

const SearchResults = () => {
    const [isPortrait, setIsPortrait] = useState(window.innerWidth < 768 || window.innerHeight > window.innerWidth);
    const [showAlert, setShowAlert] = useState(isPortrait); // Show alert only in portrait

    useEffect(() => {
        const handleResize = () => {
            const portrait = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
            setIsPortrait(portrait);
            if (portrait) {
                setShowAlert(true); // Show alert again if resizing back to portrait
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Container fluid>
            {showAlert && isPortrait && (
                <Alert variant="warning" dismissible onClose={() => setShowAlert(false)} className="text-center">
                    Use Desktop full screen for best experience
                </Alert>
            )}

            {isPortrait ? (
                // Mobile Portrait (Stacked Layout with independent scrolling)
                <>
                    <Row className="vh-50">
                        <Col xs={12} className="overflow-auto" style={{ maxHeight: "50vh" }}>
                            <ListComponent />
                        </Col>
                    </Row>
                    <Row className="vh-50">
                        <Col xs={12} className="d-flex">
                            <MapComponent />
                        </Col>
                    </Row>
                </>
            ) : (
                // Landscape & Desktop (Side-by-side)
                <Row className="g-0 vh-100">
                    <Col xs={12} md={4} className="overflow-auto" style={{ maxHeight: "100vh" }}>
                        <ListComponent />
                    </Col>
                    <Col xs={12} md={8} className="vh-100">
                        <MapComponent />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default SearchResults;
