import {useHistory} from "react-router-dom";
import moment from "moment";
import {Button} from "react-bootstrap";
import React from "react";
import * as PropTypes from "prop-types";

export function MetricsRow({index, metric, onClick}) {
    const history = useHistory();

    return (
        <tr key={index} onClick={() => {
            history.push(`/metric/${metric.id}?name=${metric.name}`)
        }}>
            <td>{index}</td>
            <td>{metric.name}</td>
            <td>{metric.lastUpdate ? moment(metric.lastUpdate).calendar() : 'None'}</td>
            <td>
                <Button className="translate-middle" variant="primary"
                        onClick={(event) => {
                            event.stopPropagation()
                            onClick()
                        }}>
                    New measure
                </Button>
            </td>
        </tr>
    )
}

MetricsRow.propTypes = {
    metric: PropTypes.shape({
        name: PropTypes.string.isRequired,
        lastUpdate: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}
