import React from 'react'
import PropTypes from 'prop-types'

import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import moment from "moment";

function getRandomHexColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function formatDate(unixTime) {
    return moment(unixTime * 1000).format('YY/MM/DD HH:mm:ss');
}

function formatTooltipContent(value, name, _props) {
    if (name === 'Time') {
        return formatDate(value)
    } else {
        return value
    }
}

const TimeSeriesChart = ({chartData}) => (
    <ResponsiveContainer width='95%' height={500}>
        <ScatterChart>
            <CartesianGrid/>
            <XAxis
                dataKey='timestamp'
                domain={['auto', 'auto']}
                name='Time'
                tickFormatter={formatDate}
                type='number'
            />
            <YAxis dataKey='measure' name='Measure'/>
            <Tooltip formatter={formatTooltipContent} cursor={{strokeDasharray: '3 3'}}/>
            <Legend/>

            {
                chartData.map(({name, measures}, index) => (
                    <Scatter
                        key={index}
                        data={measures}
                        fill={getRandomHexColor()}
                        name={name}
                    />
                ))
            }
        </ScatterChart>
    </ResponsiveContainer>
)

TimeSeriesChart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            measures: PropTypes.arrayOf(
                PropTypes.shape({
                    timestamp: PropTypes.number,
                    measure: PropTypes.number
                }))
        })
    ).isRequired
}

export default TimeSeriesChart