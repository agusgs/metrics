import React from 'react'
import PropTypes from 'prop-types'

import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import moment from "moment";

function getRandomHexColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function formatDate(timestamp) {
    return moment(timestamp).format('YY/MM/DD HH:mm:ss');
}

function formatTooltipContent(value, name, _props) {
    switch (name) {
        case 'measure':
            return [value, 'Measure']
        case 'avgDay':
            return [value, 'Day average']
        case 'avgHour':
            return [value, 'Hour average']
        case 'avgMinute':
            return [value, 'Minute average']
    }
}

const TimeSeriesChart = ({chartData}) => (
    <ResponsiveContainer width='95%' height={500}>
        <LineChart data={chartData}>
            <CartesianGrid/>
            <XAxis
                dataKey='timestamp'
                domain={['auto', 'auto']}
                name='Time'
                tickFormatter={formatDate}
            />
            <YAxis dataKey='measure' name='Measure'/>
            <Tooltip labelFormatter={formatDate} formatter={formatTooltipContent} cursor={{strokeDasharray: '3 3'}}/>
            <Legend/>
            <Line type="monotone" label='Measure' dataKey="measure" stroke={getRandomHexColor()} activeDot={{r: 8}}/>
            <Line type="monotone" label='Day average' dataKey="avgDay" stroke={getRandomHexColor()} activeDot={{r: 8}}/>
            <Line type="monotone" label='Hour average' dataKey="avgHour" stroke={getRandomHexColor()} activeDot={{r: 8}}/>
            <Line type="monotone" label='Minute average' dataKey="avgMinute" stroke={getRandomHexColor()} activeDot={{r: 8}}/>
        </LineChart>
    </ResponsiveContainer>
)

TimeSeriesChart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            timestamp: PropTypes.string.isRequired,
            measure: PropTypes.number.isRequired,
            avgDay: PropTypes.number.isRequired,
            avgHour: PropTypes.number.isRequired,
            avgMinute: PropTypes.number.isRequired,
        }).isRequired
    )
}

export default TimeSeriesChart