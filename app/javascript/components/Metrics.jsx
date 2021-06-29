import React, {useEffect, useState} from "react";
import {getMetrics} from "../lib/api";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {Card, ProgressBar, Spinner, Table} from "react-bootstrap";
import * as PropTypes from "prop-types";

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
        case success:
            return null
        default:
            return null
    }
}

MetricsFooter.propTypes = {status: PropTypes.string};

export function Metrics() {
    const [asyncState, setAsyncState] = useState({status: loading, metrics: []})
    const {status, metrics} = asyncState
    const history = useHistory();

    useEffect(() => {
        getMetrics().then((metrics) => {
            setAsyncState({status: success, metrics: metrics})
        }).catch((_e) => {
            setAsyncState({status: error, metrics: []})
        })
    }, [])

    return (
        <Card>
            <Card.Body>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Metric Name</th>
                        <th>Last Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        metrics.map((metric, index) => (
                            <tr key={index} onClick={() => {
                                history.push(`/metric/${metric.id}`)
                            }}>
                                <td>{index}</td>
                                <td colSpan="2">{metric.name}</td>
                                <td>{metric.lastUpdate > 0 ? moment(metric.lastUpdate).calendar() : 'None'}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Card.Body>
            <Card.Footer className="text-center">
                <MetricsFooter status={status}/>
            </Card.Footer>
        </Card>
    )
}