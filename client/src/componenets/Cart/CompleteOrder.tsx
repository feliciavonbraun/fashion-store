// import { Component, ContextType, CSSProperties, useContext } from 'react';
import { CSSProperties, useContext } from 'react';
import { Card, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Route, useHistory } from 'react-router-dom';
import { OrderContext } from '../../contexts/OrderContext';
import { UserContext } from '../../contexts/UserContext';

export default function CompleteOrder() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const { newOrder, getOneOrder, order, orderButton } =
        useContext(OrderContext);

    const onPlaceOrderClick = async () => {
        const order = await newOrder();
        const completeOrder = await getOneOrder(order._id);
        history.push({
            pathname: '/ordersuccess',
            state: { order: completeOrder },
        });
    };

    return (
        <>
            <Col span={24} style={buttonContainerStyle}>
                <Card
                    title='Order summary'
                    style={{ width: '80%', marginTop: '7rem' }}
                >
                    <p>
                        Products:{' '}
                        {order.orderItems.map(
                            (item) =>
                                item.qty + ' ' + item.product.title.concat(', ')
                        )}
                    </p>
                    <p>
                        {user?.firstname} {user?.lastname}
                    </p>
                    <p>{user?.email}</p>
                    <p>{order.address.phone}</p>
                    <p>
                        {`${order.address.street}, ${order.address.zipcode}, 
                ${order.address.city}`}
                    </p>
                    <p>Delivery: {order.delivery.company}</p>
                    <p>
                        Total price:{' '}
                        {order.totalprice + ' kr, incl delivery and VAT'}
                    </p>
                </Card>
            </Col>
            <Col span={24} style={buttonContainerStyle}>
                <Route
                    render={() => (
                        <Button
                            type='primary'
                            icon={<CheckCircleOutlined />}
                            size={'large'}
                            onClick={onPlaceOrderClick}
                            loading={orderButton}
                        >
                            <strong> Place order</strong>
                        </Button>
                    )}
                />
            </Col>
        </>
    );
}

const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-3rem',
    marginBottom: '8rem',
};
