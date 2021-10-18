import React from 'react';
import { Image, Col } from 'react-bootstrap'

const Chart = () => {

    return (
        <>
            {/* <Container> */}
            {/* <Row> */}
            <Col md="auto">
                <Image
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg'
                    fluid
                />

            </Col>
            <Col>
                <Image
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg'
                    fluid
                />
            </Col>
            <Col>
                <Image
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg'
                    fluid
                />
            </Col>
            {/* </Row> */}
            {/* </Container> */}
        </>
    );
}

export default Chart;