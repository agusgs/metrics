import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {createMeasure} from "../lib/api";
import {Notification} from "./Notification";
import PropTypes from "prop-types";

export function PostMeasureModal({show, close, metricName, metricId}) {
    const noNotification = {show: false, variant: 'none', message: 'none'};
    const successMessage = 'Measure created';
    const errorMessage = 'Error creating measure';

    const [notification, setNotification] = useState({...noNotification})
    const [measureValue, setMeasureValue] = useState(0)

    const newMeasure = () => {
        createMeasure(metricId, measureValue).then(() => {
            setNotification({variant: 'success', show: true, message: successMessage})
        }).catch((_e) => {
            setNotification({variant: 'danger', show: true, message: errorMessage})
        })
    }

    const measureValueChanged = (event) => setMeasureValue(event.target.value)
    const closeNotification = () => setNotification(noNotification)
    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>{metricName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Notification variant={notification.variant} show={notification.show} onClose={closeNotification}
                                  message={notification.message}/>
                    <Form>
                        <Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label>Measure</Form.Label>
                                <Form.Control required onChange={measureValueChanged} type="number"
                                              placeholder="Enter the measure" value={measureValue}/>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={newMeasure}>
                        Create measure
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

PostMeasureModal.propTypes = {
    metricName: PropTypes.string,
    metricId: PropTypes.string,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}
