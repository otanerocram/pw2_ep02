import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, ButtonGroup, Table } from "react-bootstrap";
import "./App.css";

function App() {
    const [prestamo, setPrestamo] = useState({
        principal: 0,
        plazo: 0,
        tem: 0,
    });

    const handleCalcular = (event) => {
        event.preventDefault();

        console.log("Calculando...");
        console.log(prestamo);
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setPrestamo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log("prestamo", prestamo);
    }, [prestamo]);

    return (
        <div className="App">
            <Container className="mt-4">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Calculadora de Prestamo Vehicular</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Amortizacion Sistema Frances</Card.Subtitle>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <Form onSubmit={handleCalcular}>
                                    <Form.Group as={Row} className="mb-3" controlId="principal">
                                        <Form.Label column sm="2">
                                            Monto Principal
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="number" defaultValue="" name="principal" onChange={onChange} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="plazo">
                                        <Form.Label column sm="2">
                                            Plazo en meses
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="number" defaultValue="" name="plazo" onChange={onChange} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="tem">
                                        <Form.Label column sm="2">
                                            Tasa de Interes Anual
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="number" defaultValue="" name="tem" onChange={onChange} />
                                        </Col>
                                    </Form.Group>

                                    <ButtonGroup className="mb-2">
                                        <Button type="submit" className="pl-4">
                                            Calcular
                                        </Button>
                                        <Button>Reset</Button>
                                    </ButtonGroup>
                                </Form>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Pago Mensual
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="number" defaultValue="" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Total Interes
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="number" defaultValue="" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Total Pagos
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="number" defaultValue="email@example.com" />
                                        </Col>
                                    </Form.Group>
                                </Form>

                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>PARC</th>
                                            <th>Amort</th>
                                            <th>Interes</th>
                                            <th>Pago</th>
                                            <th>Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Larry the Bird</td>
                                            <td>@fat</td>
                                            <td>@twitter</td>
                                            <td>@mdo</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
