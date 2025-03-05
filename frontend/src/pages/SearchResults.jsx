/* import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from "react-bootstrap";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";

const SearchResults = () => {
    const [isPortrait, setIsPortrait] = useState(window.innerWidth < 768 || window.innerHeight > window.innerWidth);
    const [showAlert, setShowAlert] = useState(isPortrait);

    useEffect(() => {
        const handleResize = () => {
            const portrait = (window.innerWidth < 768 || window.innerHeight > window.innerWidth);
            setIsPortrait(portrait);
            if (portrait)
                setShowAlert(portrait);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Container fluid>
            {showAlert && isPortrait && (
                <Alert variant="warning" dismissible onClose={() => setShowAlert(false)} className="text-center">
                    The browser works better in landscape. Please tilt your screen.
                </Alert>
            )}
            {isPortrait ? (
                //mobile portrait
                <>
                    <Row className="vh-50">
                        <Col xs={12} className="overflow-auto" style={{ maxHeight: "50vh" }}>
                            <ListComponent />
                        </Col>
                    </Row>
                    <Row className="vh-50">
                        <Col xs={12} className="d-flex" style={{ paddingTop: "1rem" }}>
                            <MapComponent />
                        </Col>
                    </Row>
                </>
            ) : (
                //Mobile Landscape or Desktop
                <Row className="g-0">
                    <Col xs={12} md={4} className="vh-100 overflow-auto">
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

export default SearchResults; */


import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from "react-bootstrap";
import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";

const SearchResults = () => {
    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
    const [showAlert, setShowAlert] = useState(isPortrait);

    useEffect(() => {
        const handleResize = () => {
            const portrait = window.innerHeight > window.innerWidth;
            setIsPortrait(portrait);
            if (portrait)
                setShowAlert(portrait);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Container fluid className="vh-100 p-0">
            {showAlert && isPortrait && (
                <Alert variant="warning" dismissible onClose={() => setShowAlert(false)} className="text-center m-0">
                    The browser works better in landscape. Please tilt your screen.
                </Alert>
            )}
            {isPortrait ? (
                // Mobile Portrait
                <>
                    <Row className="vh-50 m-0">
                        <Col xs={12} className="overflow-auto p-0" style={{ maxHeight: "50vh" }}>
                            <ListComponent />
                        </Col>
                    </Row>
                    <Row className="vh-50 m-0">
                        <Col xs={12} className="p-0">
                            <MapComponent />
                        </Col>
                    </Row>
                </>
            ) : (
                // Mobile Landscape or Desktop
                <Row className="g-0 m-0">
                    <Col xs={12} md={4} className="vh-100 overflow-auto p-0">
                        <ListComponent />
                    </Col>
                    <Col xs={12} md={8} className="vh-100 p-0">
                        <MapComponent />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default SearchResults;
