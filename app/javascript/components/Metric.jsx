import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getMeasures} from "../lib/api";
import TimeSeriesChart from "./TimeSeriesChart";

export function Metric() {
    const {id} = useParams();
    const loading = "LOADING"
    const error = "ERROR"
    const success = "SUCCESS"

    const [asyncState, setAsyncState] = useState({status: loading})

    useEffect(() => {
        getMeasures(id).then((metric) => {
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
            const { metric, measures } = asyncState.metric
            return (
                <>
                    <p>{metric.id} {metric.name}</p>
                    <TimeSeriesChart chartData={measures} />
                </>
            )
        default:
            return null
    }
}