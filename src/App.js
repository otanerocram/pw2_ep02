import { useState, useRef } from "react";
import { Container, Row, Col, Card, Form, Button, ButtonGroup, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { calculaCuota, calculaInteres, commify, toTEM } from "./Utils/Utils";
import ErrorMessage from "./Components/ErrorMessage";
import MyInputForm from "./Components/MyInputForm";
import "./App.css";

const initialValues = {
    monto: 0,
    inicial: 0,
    plazo: 0,
    tea: 0,
    capital: 0,
    tem: 0,
    cuota: 0,
    desgravamen: 0,
    totalIntereses: 0,
    totalPagos: 0,
    tablaPrestamo: [],
};

const initialChecks = {
    monto: false,
    inicial: false,
    plazo: false,
    tea: false,
};

const defaultMsg = {
    active: false,
    message: "",
};

function App() {
    const formRef = useRef(null);
    const [prestamo, setPrestamo] = useState(initialValues);
    const [errMsg, setErrMsg] = useState(defaultMsg);
    const [enableCheck, setEnableCheck] = useState(initialChecks);

    const checkAndSave = (isError, errormsg, prop, value) => {
        setErrMsg({
            active: isError,
            message: errormsg,
        });
        setPrestamo({
            ...prestamo,
            [prop]: value,
        });
    };

    const evaluaMonto = (monto) => {
        if (monto === "" || monto === 0) {
            checkAndSave(true, "El monto debe ser mayor a cero", "monto", monto);
            return false;
        }

        checkAndSave(false, "", "monto", monto);
        return true;
    };

    const evaluaInicial = (inicial) => {
        const inicialMin = prestamo.monto * 0.2;
        const inicialMax = prestamo.monto * 0.8;

        if (!inicial || inicial < inicialMin) {
            checkAndSave(true, "El monto inicial debe ser mayor al 20% del monto del prestamo", "inicial", inicial);
            return false;
        }

        if (inicial > inicialMax) {
            checkAndSave(true, "El monto inicial debe ser menor al 80% del monto del prestamo", "inicial", inicial);
            return false;
        }

        checkAndSave(false, "", "inicial", inicial);
        return true;
    };

    const evaluaPlazo = (plazo) => {
        if (!plazo || plazo < 6) {
            checkAndSave(true, "El plazo no puede ser menor a 6 meses.", "plazo", plazo);
            return false;
        }

        if (plazo > 48) {
            checkAndSave(true, "El plazo no puede ser mayor a 48 meses.", "plazo", plazo);
            return false;
        }

        checkAndSave(false, "", "plazo", plazo);
        return true;
    };

    const evaluaTea = (tea) => {
        if (!tea || tea < 0.1) {
            checkAndSave(true, "La tasa de interes no puede ser menor a 0.1%.", "tea", tea);
            return false;
        }

        if (tea >= 100) {
            checkAndSave(true, "La tasa de interes no puede ser mayor a 100%.", "tea", tea);
            return false;
        }

        checkAndSave(false, "", "tea", tea);
        return true;
    };

    const handleCalcular = (event) => {
        event.preventDefault();

        const montoCapital = parseFloat(prestamo.monto) - parseFloat(prestamo.inicial);
        console.log("Monto prestamo: ", montoCapital);

        const TEM = toTEM(prestamo.tea);

        const cuota = calculaCuota(montoCapital, TEM, prestamo.plazo);

        let html = [];
        let saldoCapital = montoCapital;
        let amortizacion = 0;
        let seguro = 0;
        let pago = 0;
        let sumaIntereses = 0;

        let totalInteres = [];
        let totalPagos = prestamo.plazo * cuota;

        for (let index = 0; index < prestamo.plazo; index++) {
            console.log("saldoCapital: ", saldoCapital);
            const interesMes = calculaInteres(saldoCapital, TEM);
            amortizacion = cuota - interesMes;
            seguro = saldoCapital * 0.005;
            saldoCapital = saldoCapital - amortizacion;

            totalInteres.push(interesMes);

            pago = cuota + seguro;

            html.push({
                numCuota: index + 1,
                cuota: cuota.toFixed(2),
                desgravamen: seguro.toFixed(2),
                pago: pago.toFixed(2),
                interes: interesMes.toFixed(2),
                amort: amortizacion.toFixed(2),
                capital: saldoCapital.toFixed(2),
            });
        }

        for (const element of totalInteres) {
            sumaIntereses += element;
        }

        setPrestamo({
            ...prestamo,
            capital: montoCapital,
            tem: parseFloat(TEM),
            cuota: cuota.toFixed(2),
            totalIntereses: sumaIntereses.toFixed(2),
            totalPagos: totalPagos.toFixed(2),
            tablaPrestamo: html,
        });
    };

    const handleChange = (property, values) => {
        switch (property) {
            case "monto":
                setEnableCheck({
                    ...enableCheck,
                    monto: evaluaMonto(values.floatValue),
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
            case "tea":
                setEnableCheck({
                    ...enableCheck,
                    tea: evaluaTea(values.floatValue),
                });
                break;
            default:
                break;
        }
    };

    const handleReset = () => {
        formRef.current.reset();
        setPrestamo(initialValues);
        setEnableCheck(initialChecks);
        setErrMsg(defaultMsg);
    };

    return (
        <div className="App">
            <Container className="mt-4">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <div className="banner mb-4"></div>

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
                                                disabled={!prestamo.monto}
                                                value={prestamo.plazo}
                                            />

                                            <MyInputForm
                                                label="Tasa de Interes Anual"
                                                property="tea"
                                                onChange={handleChange}
                                                thousandSeparator={true}
                                                prefix="% "
                                                decimalScale={2}
                                                disabled={!prestamo.monto}
                                                value={prestamo.tea}
                                            />
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

                                            <Row className="my-3">
                                                <Col className="text-end">
                                                    <ButtonGroup className="mb-2">
                                                        <Button
                                                            type="submit"
                                                            className={`pl-4 ${
                                                                !(
                                                                    enableCheck.inicial &&
                                                                    enableCheck.monto &&
                                                                    enableCheck.plazo &&
                                                                    enableCheck.tea
                                                                ) && "disabled"
                                                            }`}
                                                        >
                                                            Calcular
                                                        </Button>
                                                        <Button type="reset" onClick={handleReset} variant="danger">
                                                            Reset
                                                        </Button>
                                                    </ButtonGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <MyInputForm
                                                label="Capital"
                                                thousandSeparator={true}
                                                prefix="S/ "
                                                decimalScale={2}
                                                disabled={true}
                                                value={prestamo.capital}
                                            />
                                            <MyInputForm
                                                label="Tasa Efectiva Mensual"
                                                thousandSeparator={true}
                                                prefix="%. "
                                                decimalScale={4}
                                                disabled={true}
                                                value={prestamo.tem}
                                            />

                                            <MyInputForm
                                                label="Pago Mensual"
                                                thousandSeparator={true}
                                                prefix="S/ "
                                                decimalScale={2}
                                                disabled={true}
                                                value={prestamo.cuota}
                                            />

                                            <MyInputForm
                                                label="Total Intereses"
                                                thousandSeparator={true}
                                                prefix="S/ "
                                                decimalScale={2}
                                                disabled={true}
                                                value={prestamo.totalIntereses}
                                            />

                                            <MyInputForm
                                                label="Total Pagos"
                                                thousandSeparator={true}
                                                prefix="S/ "
                                                decimalScale={2}
                                                disabled={true}
                                                value={prestamo.totalPagos}
                                            />
                                        </Form>
                                    </Col>
                                </Row>

                                {prestamo.tablaPrestamo.length > 0 && (
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th className="text-end">Número</th>
                                                <th className="text-end">Amortización</th>
                                                <th className="text-end">Interés</th>
                                                <th className="text-end">Cuota Mensual</th>
                                                <OverlayTrigger
                                                    key={`top`}
                                                    placement={`top`}
                                                    overlay={<Tooltip id={`tooltip-top`}>Desgravamen 0.5%</Tooltip>}
                                                >
                                                    <th className="text-end">Desgravamen</th>
                                                </OverlayTrigger>

                                                <th className="text-end">Monto a Pagar</th>
                                                <th className="text-end">Saldo Capital</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prestamo.tablaPrestamo.map((el, idx) => (
                                                <tr key={idx}>
                                                    <td className="text-end">{el.numCuota}</td>
                                                    <td className="text-end">S/ {commify(el.amort.toString())}</td>
                                                    <td className="text-end">S/ {commify(el.interes.toString())}</td>
                                                    <td className="text-end">S/ {commify(el.cuota.toString())}</td>
                                                    <td className="text-end">
                                                        S/ {commify(el.desgravamen.toString())}
                                                    </td>
                                                    <td className="text-end">S/ {commify(el.pago.toString())}</td>
                                                    <td className="text-end">S/ {commify(el.capital.toString())}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
