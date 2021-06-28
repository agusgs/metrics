import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getMetric} from "../lib/api";
import TimeSeriesChart from "./TimeSeriesChart";

export function Metric() {
    const {id} = useParams();
    const loading = "LOADING"
    const error = "ERROR"
    const success = "SUCCESS"

    const [asyncState, setAsyncState] = useState({status: loading})

    useEffect(() => {
        getMetric(id).then((metric) => {
            setAsyncState({status: success, metric: metric})
        }).catch((_e) => {
            setAsyncState({status: error})
        })
    }, [])

    switch (asyncState.status) {
        case loading:
            return <p>Loading</p>
        case error:
            return <p>Error</p>
        case success:
            return (
                <>
                    <p>{asyncState.id} {asyncState.metric.name}</p>
                    <p> Average per day = {asyncState.metric.avgDay}</p>
                    <p> Average per hour = {asyncState.metric.avgHour}</p>
                    <p> Average per minute = {asyncState.metric.avgMin}</p>
                    <TimeSeriesChart chartName={asyncState.metric.name} chartData={asyncState.metric.measures} />
                </>
            )
        default:
            return null
    }
}