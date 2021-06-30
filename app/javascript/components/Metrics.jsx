import React, {useEffect, useState} from "react";
import {getMetrics} from "../lib/api";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {Button, Card, Spinner, Table} from "react-bootstrap";
import {PostMeasureModal} from "./PostMeasureModal";
import {CreateMetric} from "./CreateMetric";

const loading = "LOADING"
const error = "ERROR"
const success = "SUCCESS"

function MetricsFooter({status}) {
    switch (status) {
        case loading:
            return <Spinner animation="border"/>
        case error:
            return <Card.Text>
                There was an error fetching the data from the server, please try again later
            </Card.Text>
        default:
            return null
    }
}

export function Metrics() {
    const [asyncState, setAsyncState] = useState({status: loading, metrics: []})
    const {status, metrics} = asyncState
    const history = useHistory();
    const closedModal = {metricName: '', metricId: null, open: false};
    const [postMeasureModal, setPostMeasureModal] = useState(closedModal);
    const [metricCreated, setMetricCreated] = useState(false);

    const showPostMeasureModal = (event, metricName, metricId) => {
        event.stopPropagation()
        setPostMeasureModal({metricName: metricName, metricId: metricId, open: true});
    }
    const closePostMeasureModal = () => setPostMeasureModal(closedModal);

    useEffect(() => {
        getMetrics().then((metrics) => {
            setAsyncState({status: success, metrics: metrics})
        }).catch((_e) => {
            setAsyncState({status: error, metrics: []})
        })
    }, [metricCreated])

    return (
        <>
            <Card>
                <Card.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Metric Name</th>
                            <th>Last Updated</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            metrics.map((metric, index) => (
                                <tr key={index} onClick={() => {
                                    history.push(`/metric/${metric.id}?name=${metric.name}`)
                                }}>
                                    <td>{index}</td>
                                    <td>{metric.name}</td>
                                    <td>{metric.lastUpdate ? moment(metric.lastUpdate).calendar() : 'None'}</td>
                                    <td>
                                        <Button className="translate-middle" variant="primary"
                                                onClick={(e) => {
                                                    showPostMeasureModal(e, metric.name, metric.id)
                                                }}>
                                            New measure
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="text-center">
                    <CreateMetric onClick={() => setMetricCreated(false)} afterCreation={() => setMetricCreated(true)}/>
                    <MetricsFooter status={status}/>
                </Card.Footer>
            </Card>
            <PostMeasureModal show={postMeasureModal.open} metricName={postMeasureModal.metricName}
                              metricId={postMeasureModal.metricId} close={closePostMeasureModal}/>

        </>
    )
}
