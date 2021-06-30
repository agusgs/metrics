import {useLocation, useParams} from "react-router-dom";
import React, {useState} from "react";
import {Card, Col, Form, Row} from "react-bootstrap";
import moment from "moment";
import {MetricChart} from "./MetricChart";

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
                <Form>
                    <Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                            <select className="form-control" onChange={filterChanged}>
                                <option value={last_day.valueOf()}>Last day</option>
                                <option value={lastWeek.valueOf()}>Last week</option>
                                <option value={last_month.valueOf()}>Last Month</option>
                                <option value={none_selected}>Beginning of time</option>
                            </select>
                        </Col>
                    </Row>
                </Form>
                <MetricChart metricId={id} filterFrom={selectedFilter}/>
            </Card.Body>
        </Card>
    )
}
