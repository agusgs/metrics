import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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

const TimeSeriesChart = ({ chartName, chartData }) => (
    <ResponsiveContainer width = '95%' height = {500} >
        <ScatterChart>
            <XAxis
                dataKey = 'timestamp'
                domain = {['auto', 'auto']}
                name = 'Time'
                tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')}
                type = 'number'
            />
            <YAxis dataKey = 'measure' name = 'Measure' />

            <Scatter
                data = {chartData}
                line = {{ stroke: '#eee' }}
                lineJointType = 'monotoneX'
                lineType = 'joint'
                name = {chartName}
            />

        </ScatterChart>
    </ResponsiveContainer>
)

TimeSeriesChart.propTypes = {
    chartName: PropTypes.string.isRequired,
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            timestamp: PropTypes.number,
            measure: PropTypes.number
        })
    ).isRequired
}

export default TimeSeriesChart