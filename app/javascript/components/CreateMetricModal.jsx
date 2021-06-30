import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Notification} from "./Notification";
import PropTypes from "prop-types";
import {createMetric} from "../lib/api";

export function CreateMetricModal({show, close}) {
    const noNotification = {show: false, variant: 'none', message: 'none'};
    const successMessage = 'Metric created';
    const errorMessage = 'Error creating Metric';

    const [notification, setNotification] = useState({...noNotification})
    const [metricName, setMetricName] = useState('')

    const newMetric = () => {
        createMetric(metricName).then(() => {
            setNotification({variant: 'success', show: true, message: successMessage})
        }).catch((_e) => {
            setNotification({variant: 'danger', show: true, message: errorMessage})
        })
    }

    const measureValueChanged = (event) => setMetricName(event.target.value)
    const closeNotification = () => setNotification(noNotification)
    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new metric</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Notification variant={notification.variant} show={notification.show} onClose={closeNotification}
                                  message={notification.message}/>
                    <Form>
                        <Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label>Metric name</Form.Label>
                                <Form.Control onChange={measureValueChanged} type="text"
                                              placeholder="Name" value={metricName}/>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button disabled={ !metricName || metricName === '' } variant="primary" onClick={newMetric}>
                        Create metric
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

CreateMetricModal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}
