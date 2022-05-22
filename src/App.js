import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Form, Button, ButtonGroup, Table } from "react-bootstrap";
import { onlyNumber } from "./Utils/Utils";
import vehiculo from "./assets/vehiculo.png";
import ErrorMessage from "./Components/ErrorMessage";
import MyInputForm from "./Components/MyInputForm";
import "./App.css";

function App() {
    const formRef = useRef(null);
    const [prestamo, setPrestamo] = useState({
        monto: 0,
        inicial: 0,
        plazo: 0,
        tem: 0,
    });

    const [errMsg, setErrMsg] = useState({
        active: false,
        message: "",
    });

    const [enableCheck, setEnableCheck] = useState({
        monto: false,
        inicial: false,
        plazo: false,
        tem: false,
    });

    const evaluaInicial = (inicial) => {
        const inicialMin = prestamo.monto * 0.2;
        const inicialMax = prestamo.monto * 0.8;

        const guardaInicial = (isError, errormsg, numinicial) => {
            setErrMsg({
                active: isError,
                message: errormsg,
            });
            setPrestamo({
                ...prestamo,
                inicial: numinicial,
            });
        };

        if (!inicial || inicial < inicialMin) {
            guardaInicial(true, "El monto inicial debe ser mayor al 20% del monto del prestamo", inicial);
            return false;
        }

        if (inicial > inicialMax) {
            guardaInicial(true, "El monto inicial debe ser menor al 80% del monto del prestamo", inicial);

            return false;
        }

        guardaInicial(false, "", inicial);
        return true;
    };

    const evaluaPlazo = (plazo) => {
        const guardaPlazo = (isError, errormsg, numplazo) => {
            setErrMsg({
                active: isError,
                message: errormsg,
            });
            // onlyNumber(numplazo) &&
            setPrestamo((prevState) => ({
                ...prevState,
                plazo: numplazo,
            }));
        };

        if (!plazo || plazo < 6) {
            console.log("plazo", plazo);
            guardaPlazo(true, "El plazo no puede ser menor a 6 meses.", plazo);
            return false;
        }

        if (plazo > 48) {
            guardaPlazo(true, "El plazo no puede ser mayor a 48 meses.", plazo);
            return false;
        }

        guardaPlazo(false, "", plazo);
        return true;
    };

    const evaluaTem = (tem) => {
        const guardaTem = (isError, errormsg, numtem) => {
            setErrMsg({
                active: isError,
                message: errormsg,
            });
            // onlyNumber(numtem) &&
            setPrestamo((prevState) => ({
                ...prevState,
                tem: numtem,
            }));
        };

        if (!tem || tem < 0.1) {
            guardaTem(true, "La tasa de interes no puede ser menor a 0.1%.", tem);
            return false;
        }

        if (tem >= 100) {
            guardaTem(true, "La tasa de interes no puede ser mayor a 100%.", tem);
            return false;
        }

        guardaTem(false, "", tem);
        return true;
    };

    const handleCalcular = (event) => {
        event.preventDefault();

        console.log("Calculando...");
        console.log(prestamo);

        formRef.current.reset();
    };

    const handleChange = (property, values) => {
        switch (property) {
            case "monto":
                setPrestamo((prevState) => ({
                    ...prevState,
                    monto: values.floatValue,
                }));

                setEnableCheck({
                    ...enableCheck,
                    monto: true,
                });
                break;
            case "inicial":
                setEnableCheck({
                    ...enableCheck,
                    inicial: evaluaInicial(values.floatValue),
                });

                break;
            case "plazo":
                setEnableCheck({
                    ...enableCheck,
                    plazo: evaluaPlazo(values.floatValue),
                });

                break;

            case "tem":
                setEnableCheck({
                    ...enableCheck,
                    tem: evaluaTem(values.floatValue),
                });
                break;
            default:
                break;
        }
    };

    const handleReset = () => {
        formRef.current.reset();
        setPrestamo({
            monto: 0,
            inicial: 0,
            plazo: 0,
            tem: 0,
        });
        setEnableCheck({
            monto: false,
            inicial: false,
            plazo: false,
            tem: false,
        });
        setErrMsg({
            active: false,
            message: "",
        });
    };

    useEffect(() => {
        console.log("prestamo", prestamo);
    }, [prestamo]);

    useEffect(() => {
        console.log("enableCheck", enableCheck);
    }, [enableCheck]);

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
                                        <Form onSubmit={handleCalcular} ref={formRef}>
                                            <MyInputForm
                                                label="Monto Vehiculo"
                                                property="monto"
                                                onChange={handleChange}
                                                thousandSeparator={true}
                                                prefix="S/ "
                                                decimalSeparator="."
                                                displayType="input"
                                                decimalScale={2}
                                                value={prestamo.monto}
                                            />

                                            <MyInputForm
                                                label="Inicial"
                                                property="inicial"
                                                onChange={handleChange}
                                                thousandSeparator={true}
                                                prefix="S/ "
                                                decimalSeparator="."
                                                displayType="input"
                                                decimalScale={2}
                                                disabled={!prestamo.monto}
                                                value={prestamo.inicial}
                                            />

                                            <MyInputForm
                                                label="Plazo en meses"
                                                property="plazo"
                                                onChange={handleChange}
                                                // decimalSeparator="."
                                                // displayType="input"
                                                // decimalScale={0}
                                                disabled={!prestamo.monto}
                                                value={prestamo.plazo}
                                            />

                                            <MyInputForm
                                                label="Tasa de Interes Anual"
                                                property="tem"
                                                onChange={handleChange}
                                                thousandSeparator={true}
                                                prefix="% "
                                                decimalScale={0}
                                                disabled={!prestamo.monto}
                                                value={prestamo.tem}
                                            />

                                            <ButtonGroup className="mb-2">
                                                <Button
                                                    type="submit"
                                                    className={`pl-4 ${
                                                        !(
                                                            enableCheck.inicial &&
                                                            enableCheck.monto &&
                                                            enableCheck.plazo &&
                                                            enableCheck.tem
                                                        ) && "disabled"
                                                    }`}
                                                >
                                                    Calcular
                                                </Button>
                                                <Button type="reset" onClick={handleReset} variant="danger">
                                                    Reset
                                                </Button>
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
                                            <Row>
                                                <Col>
                                                    {errMsg.active && (
                                                        <ErrorMessage
                                                            className="fs-6 text-danger text-end m-2"
                                                            message={errMsg.message}
                                                        />
                                                    )}
                                                </Col>
                                            </Row>
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
