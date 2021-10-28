import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    YAxis,
    Label,
    ResponsiveContainer
} from 'recharts'
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const Chart = ({ closePrices, startWatchDt, fill }) => {

    const filteredClosePrices = closePrices.filter((dateToFilter) => dateToFilter.date >= formatDate(startWatchDt))

    const maxPrice = parseInt(Math.max(...filteredClosePrices.map(({ close }) => close)) * 1.02)
    const minPrice = parseInt(Math.min(...filteredClosePrices.map(({ close }) => close)) * .98)

    return (
        <ResponsiveContainer minWidth={130} minHeight={240}>
            <AreaChart data={filteredClosePrices} margin={{ top: 10, right: 30, left: 0, bottom: 0, }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis type="number" domain={[minPrice, maxPrice]}>
                    <Label value="Close Price" position="insideLeft" angle={270} />
                </YAxis>
                <Tooltip />
                <Area type="monotone" dataKey="close" stroke={fill} fill={fill} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default Chart;