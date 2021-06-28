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

const TimeSeriesChart = ({chartData}) => (
    <ResponsiveContainer width='95%' height={500}>
        <ScatterChart>
            <CartesianGrid/>
            <XAxis
                dataKey='timestamp'
                domain={['auto', 'auto']}
                name='Time'
                tickFormatter={(unixTime) => moment(unixTime).format('HH:mm Do')}
                type='number'
            />
            <YAxis dataKey='measure' name='Measure'/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <Legend/>

            {
                chartData.map(({name, measures}, index) => (
                    <Scatter
                        key={index}
                        data={measures}
                        line={{stroke: '#eee'}}
                        lineJointType='monotoneX'
                        lineType='joint'
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