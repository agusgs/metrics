import {Pagination} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";

export function MetricsPagination({current, total, onChange}) {
    const pages = []
    if(total > 1) {
        for (let number = 1; number <= total; number++) {
            pages.push(
                <Pagination.Item key={number} active={number === current} onClick={() => onChange(number)}>
                    {number}
                </Pagination.Item>
            )
        }
    }

    return (
        <Pagination>{pages}</Pagination>
    )
}

MetricsPagination.propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}