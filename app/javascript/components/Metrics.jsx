import React, {useEffect, useState} from "react";
import {getMetrics} from "../lib/api";
import {Link} from "react-router-dom";

export function Metrics() {
    const loading = "LOADING"
    const error = "ERROR"
    const success = "SUCCESS"

    const [asyncState, setAsyncState] = useState({status: loading})

    useEffect(() => {
        getMetrics().then((metrics) => {
            setAsyncState({status: success, metrics: metrics})
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
                <li>
                    {asyncState.metrics.map((metric) => {
                        return (
                            <ul key={metric.id}>
                                <Link to={`/metric/${metric.id}`}>{`${metric.name} ${metric.lastUpdate}`}</Link>
                            </ul>
                        )
                    })}
                </li>
            )
        default:
            return null
    }
}