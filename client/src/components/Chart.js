import React from 'react';
import { Image, Col, Row } from 'react-bootstrap'
import {
    LineChart,
    XAxis,
    CartesianGrid,
    Line,
    Tooltip,
    YAxis,
    Label, ResponsiveContainer, AreaChart, ReferenceLine, Area
} from 'recharts'


const Chart = ({ closePrices }) => {

    const maxPrice = parseInt(  Math.max(...closePrices.map(({close}) => close))*1.05)
    const minPrice = parseInt(  Math.min(...closePrices.map(({close}) => close))*.98)
    return (

        <ResponsiveContainer minWidth={260} minHeight={240}>
            <LineChart data={closePrices} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="close" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" angle={-60} hide/>
                <YAxis type="number" domain={[minPrice, maxPrice]}>
                <Label value="Close Price" position="insideLeft" angle={270} />
                </YAxis>
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Chart;