// import { Component, ContextType, CSSProperties, useContext } from 'react';
import { CSSProperties, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Card, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Route } from 'react-router-dom';
// import { OrderContext } from '../../contexts/OrderContext';

export default function CompleteOrder() {
    const { handlePlaceOrder } = useContext(CartContext);
    // const { newOrder } = useContext(OrderContext);

    const onPlaceOrderClick = (history: any) => {
        handlePlaceOrder(history);
        // newOrder()
    };

    return (
        <CartContext.Consumer>
            {({
                cart,
                deliveryMethod,
                getTotalPrice,
                disablePlaceOrderButton,
            }) => {
                return (
                    <>
                        <Col span={24} style={buttonContainerStyle}>
                            <Card
                                title='Order summary'
                                style={{ width: '80%', marginTop: '7rem' }}
                            >
                                <p>
                                    Products:{' '}
                                    {cart.map(
                                        (item) =>
                                            item.qty +
                                            ' ' +
                                            item.product.title.concat(', ')
                                    )}
                                </p>
                                <p>Delivery: {deliveryMethod.company}</p>
                                <p>
                                    Total price:{' '}
                                    {getTotalPrice() +
                                        ' kr, incl delivery and VAT'}
                                </p>
                            </Card>
                        </Col>
                        <Col span={24} style={buttonContainerStyle}>
                            <Route
                                render={({ history }) => (
                                    <Button
                                        type='primary'
                                        icon={<CheckCircleOutlined />}
                                        size={'large'}
                                        onClick={() =>
                                            onPlaceOrderClick(history)
                                        }
                                        loading={disablePlaceOrderButton}
                                    >
                                        <strong> Place order</strong>
                                    </Button>
                                )}
                            />
                        </Col>
                    </>
                );
            }}
        </CartContext.Consumer>
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
