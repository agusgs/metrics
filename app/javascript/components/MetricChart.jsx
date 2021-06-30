import React, {useEffect, useState} from "react";
import {getMeasures} from "../lib/api";
import {Card, Spinner} from "react-bootstrap";
import TimeSeriesChart from "./TimeSeriesChart";

const loading = "LOADING"
const error = "ERROR"
const success = "SUCCESS"

export function MetricChart({metricId, filterFrom}) {
    const [asyncState, setAsyncState] = useState({status: loading, measures: []})
    const {status, measures} = asyncState

    useEffect(() => {
        getMeasures(metricId, filterFrom).then(({metric, measures}) => {
            setAsyncState({status: success, metric: metric, measures: measures})
        }).catch((_e) => {
            setAsyncState({status: error, metric: {}, measures: []})
        })
    }, [filterFrom])

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