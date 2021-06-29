import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getMeasures} from "../lib/api";
import TimeSeriesChart from "./TimeSeriesChart";
import {Card, Spinner} from "react-bootstrap";
import moment from "moment";

const loading = "LOADING"
const error = "ERROR"
const success = "SUCCESS"

function Chart({metricId, filterFrom}) {
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

export function Metric() {
    const {id} = useParams();
    const name = new URLSearchParams(useLocation().search).get('name');
    const last_day = moment().subtract(1, 'day');
    const lastWeek = moment().subtract(1, 'week');
    const last_month = moment().subtract(1, 'month');
    const none_selected = null;

    const [selectedFilter, setSelectedFilter] = useState(last_day)

    const filterChanged = (event) => {
        let value = parseInt(event.target.value)
        setSelectedFilter(value ? moment(value) : null);
    }
    return (
        <Card>
            <Card.Body className="text-center">
                <Card.Title>{name}</Card.Title>
                <select className="form-control" onChange={filterChanged}>
                    <option value={last_day.valueOf()}>Last day</option>
                    <option value={lastWeek.valueOf()}>Last week</option>
                    <option value={last_month.valueOf()}>Last Month</option>
                    <option value={none_selected}>Beginning of time</option>
                </select>
                <Chart metricId={id} filterFrom={selectedFilter}/>
            </Card.Body>
        </Card>
    )
}
