import { Result, Button, Row, Col } from 'antd';
import { CSSProperties } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Order } from '../../contexts/OrderContext';
import Reciept from './Reciept';

interface Props extends RouteComponentProps<{}, {}, { order: Order }> {}

function OrderSuccessMessage(props: Props) {
    const { order } = props.location.state;

    console.log(order);

    return (
        <Row style={containerStyle}>
            <Col span={24} style={colStyle}>
                <Result
                    status='success'
                    title='You successfully purchased from FashionStore'
                    subTitle={'Your ordernumber is: ' + order._id}
                    extra={[
                        <Link to='/'>
                            <Button type='primary' key='console'>
                                Continue shopping
                            </Button>
                        </Link>,
                    ]}
                />
                <Reciept order={order} />
            </Col>
        </Row>
    );
}

export default withRouter(OrderSuccessMessage);

const containerStyle: CSSProperties = {
    margin: 'auto',
};

const colStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    marginBottom: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
};
