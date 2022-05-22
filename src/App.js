import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, ButtonGroup, Table } from "react-bootstrap";
import NumberFormat from "react-number-format";
import vehiculo from "./assets/vehiculo.png";
import Swal from "sweetalert2";
import "./App.css";

function App() {
    const [prestamo, setPrestamo] = useState({
        monto: 0,
        inicial: 0,
        plazo: 0,
        tem: 0,
    });

    const [enableCalc, setEnableCalc] = useState(false);

    const evaluaInicial = () => {
        const inicialMin = prestamo.monto * 0.2;
        const inicialMax = prestamo.monto * 0.8;

        if (prestamo.inicial < inicialMin) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: `El monto de la inicial debe ser mayor al 20% del monto del préstamo.`,
                footer: `Monto Vehiculo: S/ ${prestamo.monto} -> Inicial Mínima (20%): S/ ${inicialMin}`,
            });
            setEnableCalc(false);
            return false;
        }

        if (prestamo.inicial > inicialMax) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: `El monto de la inicial supera al 80% del monto del préstamo, reduzca el monto de la inicial.`,
                footer: `Monto Vehiculo: S/ ${prestamo.monto} -> Inicial Máxima (80%): S/ ${inicialMax}`,
            });
            setEnableCalc(false);
            return false;
        }

        return true;
    };

    const handleCalcular = (event) => {
        event.preventDefault();

        console.log("Calculando...");
        console.log(prestamo);

        setEnableCalc(true);
    };

    const handleChange = (property, values) => {
        setPrestamo((prevState) => ({
            ...prevState,
            [property]: values.floatValue,
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
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </Card.Text>

                                <img src={vehiculo} alt="credito vehicular" className="m-4" />
                                <Row>
                                    <Col>
                                        <Form onSubmit={handleCalcular}>
                                            <Form.Group as={Row} className="mb-3" controlId="monto">
                                                <Form.Label className="text-end" column sm="6">
                                                    Monto Vehiculo
                                                </Form.Label>
                                                <Col sm="6">
                                                    <NumberFormat
                                                        className="form-control"
                                                        thousandSeparator={true}
                                                        prefix="S/ "
                                                        onValueChange={(values) => {
                                                            handleChange("monto", values);
                                                        }}
                                                        decimalSeparator="."
                                                        displayType="input"
                                                        allowNegative={false}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="inicial">
                                                <Form.Label className="text-end" column sm="6">
                                                    Inicial
                                                </Form.Label>
                                                <Col sm="6">
                                                    <NumberFormat
                                                        className="form-control"
                                                        thousandSeparator={true}
                                                        prefix="S/ "
                                                        onValueChange={(values) => {
                                                            handleChange("inicial", values);
                                                        }}
                                                        decimalSeparator="."
                                                        displayType="input"
                                                        allowNegative={false}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        disabled={!prestamo.monto}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="plazo">
                                                <Form.Label className="text-end" column sm="6">
                                                    Plazo en meses
                                                </Form.Label>
                                                <Col sm="6">
                                                    <NumberFormat
                                                        className="form-control"
                                                        onValueChange={(values) => {
                                                            handleChange("plazo", values);
                                                        }}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="tem">
                                                <Form.Label className="text-end" column sm="6">
                                                    Tasa de Interes Anual
                                                </Form.Label>
                                                <Col sm="6">
                                                    <NumberFormat
                                                        className="form-control"
                                                        thousandSeparator={true}
                                                        prefix="% "
                                                        onValueChange={(values) => {
                                                            handleChange("tem", values);
                                                        }}
                                                    />
                                                    <span>error</span>
                                                </Col>
                                            </Form.Group>

                                            <ButtonGroup className="mb-2">
                                                <Button type="submit" className="pl-4" disabled={!enableCalc}>
                                                    Calcular
                                                </Button>
                                                <Button>Reset</Button>
                                            </ButtonGroup>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                <Form.Label className="text-end" column sm="3">
                                                    Pago Mensual
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control readOnly type="number" defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                <Form.Label className="text-end" column sm="3">
                                                    Total Interes
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control readOnly type="number" defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                <Form.Label className="text-end" column sm="3">
                                                    Total Pagos
                                                </Form.Label>
                                                <Col sm="9">
                                                    <Form.Control
                                                        readOnly
                                                        type="number"
                                                        defaultValue="email@example.com"
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>

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
