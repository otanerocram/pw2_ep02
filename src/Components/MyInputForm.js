import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import NumberFormat from "react-number-format";

const MyInputForm = (props) => {
    return (
        <Form.Group as={Row} className="mb-3" controlId={props.property}>
            <Form.Label className="text-end" column sm="6">
                {props.label}
            </Form.Label>
            <Col sm="6">
                <NumberFormat
                    className="form-control"
                    onValueChange={(values) => {
                        props.onChange && props.onChange(props.property, values);
                    }}
                    allowNegative={false}
                    fixedDecimalScale={true}
                    decimalScale={props.decimalScale}
                    {...props}
                />
            </Col>
        </Form.Group>
    );
};

export default MyInputForm;
