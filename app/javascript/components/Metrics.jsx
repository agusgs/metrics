import React, {useEffect, useState} from "react";
import {getMetrics} from "../lib/api";
import {Card, Spinner, Table} from "react-bootstrap";
import {PostMeasureModal} from "./PostMeasureModal";
import {CreateMetric} from "./CreateMetric";
import {MetricsPagination} from "./MetricsPagination";
import {MetricsRow} from "./MetricsRow";

const loading = "LOADING"
const error = "ERROR"
const success = "SUCCESS"

function MetricsFooter({status, children}) {
    switch (status) {
        case loading:
            return <Spinner animation="border"/>
        case error:
            return <Card.Text>
                There was an error fetching the data from the server, please try again later
            </Card.Text>
        case success:
            return children
        default:
            return null
    }
}

export function Metrics() {
    const [status, setStatus] = useState(loading)
    const [metrics, setMetrics] = useState([])
    const [pagination, setPagination] = useState({current: 1, total: 1})
    const closedModal = {metricName: '', metricId: null, open: false};
    const [postMeasureModal, setPostMeasureModal] = useState(closedModal);
    const [metricCreated, setMetricCreated] = useState(false);

    const showPostMeasureModal = (metricName, metricId) => {
        setPostMeasureModal({metricName: metricName, metricId: metricId, open: true});
    }

    const setCurrentPage = (current) => setPagination({...pagination, current: current})

    useEffect(() => {
        getMetrics(pagination.current).then((response) => {
            setStatus(success)
            setMetrics(response.data)
            setPagination(response.page)
        }).catch((_e) => {
            setStatus(error)
            setMetrics([])
        })
    }, [metricCreated, pagination.current])

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
                                <MetricsRow key={index} index={index} metric={metric}
                                            onClick={() => showPostMeasureModal(metric.name, metric.id)}/>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="text-center">
                    <MetricsFooter status={status}>
                        <MetricsPagination {...pagination} onChange={setCurrentPage}/>
                        <CreateMetric onClick={() => setMetricCreated(false)}
                                      afterCreation={() => setMetricCreated(true)}/>
                    </MetricsFooter>
                </Card.Footer>
            </Card>
            <PostMeasureModal show={postMeasureModal.open} metricName={postMeasureModal.metricName}
                              metricId={postMeasureModal.metricId} close={() => setPostMeasureModal(closedModal)}/>

        </>
    )
}
