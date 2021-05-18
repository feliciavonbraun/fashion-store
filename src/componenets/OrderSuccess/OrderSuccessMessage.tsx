import { Result, Button, Row, Col } from 'antd';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Reciept from '../OrderSuccess/Reciept';

function OrderSuccessMessage() {
    return (
        <Row style={containerStyle}>
            <Col span={24} style={colStyle}>
                <Result
                    status="success"
                    title="You successfully purchased from FashionStore"
                    subTitle={'Your order number is: ' + Math.floor(Math.random() * 1000000000000)}
                    extra={[
                    <Link to='/'>
                        <Button type="primary" key="console">Continue shopping</Button>
                    </Link>
                    ]}
                />
                <Reciept />
            </Col>
        </Row>
    ) 
}

export default OrderSuccessMessage; 

const containerStyle: CSSProperties = {
    margin: 'auto'
}

const colStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    marginBottom: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
}