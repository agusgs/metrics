import React, {useState} from "react";
import {CreateMetricModal} from "./CreateMetricModal";
import {Button, Col, Form, Row} from "react-bootstrap";

export function CreateMetric({onClick, afterCreation}) {
    const [createMetric, setCreateMetric] = useState(false);
    const close = () => {
        setCreateMetric(false)
        afterCreation()
    }
    return (
        <>
            <CreateMetricModal show={createMetric} close={close}/>
            <Form>
                <Row className="align-items-center">
                    <Col xs="auto" className="my-1">
                        <Button className="translate-middle" variant="primary"
                                onClick={() => {
                                    onClick()
                                    setCreateMetric(true)
                                }}>
                            New metric
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}