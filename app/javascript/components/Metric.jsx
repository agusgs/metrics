import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getMeasures} from "../lib/api";
import TimeSeriesChart from "./TimeSeriesChart";
import {Card, Spinner} from "react-bootstrap";

const loading = "LOADING"
const error = "ERROR"
const success = "SUCCESS"

function Chart({status, measures}) {
    switch (status) {
        case loading:
            return <Spinner animation="border"/>
        case error:
            return <Card.Text>
                There was an error fetching the data from the server, please try again later
            </Card.Text>
        case success:
            return <TimeSeriesChart chartData={measures}/>
        default:
            return null
    }
}

export function Metric() {
    const {id} = useParams();
    const [asyncState, setAsyncState] = useState({status: loading, metric: {}, measures: []})
    const {status, metric, measures} = asyncState

    useEffect(() => {
        getMeasures(id).then(({metric, measures}) => {
            setAsyncState({status: success, metric: metric, measures: measures})
        }).catch((_e) => {
            setAsyncState({status: error, metric: {}, measures: []})
        })
    }, [])

    return (
        <Card>
            <Card.Body className="text-center">
                <Card.Title>{metric.name || ''}</Card.Title>
                <Chart status={status} measures={measures}/>
            </Card.Body>
        </Card>
    )
}