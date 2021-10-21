import React from 'react';
import { Image, Col, Row } from 'react-bootstrap'
import {
    LineChart,
    XAxis,
    CartesianGrid,
    Line,
    Tooltip,
    YAxis,
    Label
} from 'recharts'


const Chart = ({closePrices}) => {

    return (
        <>
            {/* <Container> */}
            <Row>
            <Col md="auto">
                <LineChart
                    width={900}
                    height={500}
                    data={closePrices}
                    margin={{ top: 50, right: 20, left: 10, bottom: 5 }}
                >
                    <YAxis tickCount={10} type="number" width={80}>
                        <Label value="Close Price" position="insideLeft" angle={270} />
                    </YAxis>
                    <Tooltip />
                    <XAxis padding={{ left: 5, right: 5 }} tickCount={10} angle={-60} height={90} dataKey="date" />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="close" stroke="#ff7300" yAxisId={0} />
                </LineChart>
            </Col>
            </Row>
            {/* </Container> */}
        </>
    );
}

export default Chart;