import { Component, ContextType, CSSProperties } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Card, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Route } from 'react-router-dom';

class CompleteOrder extends Component {
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;

    onPlaceOrderClick = (history: any) => {
        const { handlePlaceOrder } = this.context;
        handlePlaceOrder(history);
    }

    render() {
        return(
            <CartContext.Consumer>
                {({ cart, deliveryMethod, getTotalPrice, disablePlaceOrderButton }) => {
                    return (
                        <>
                        <Col span={24} style={buttonContainerStyle}>
                            <Card title="Order summary" style={{ width: '80%', marginTop: '7rem' }}>
                                <p>Products: {cart.map((item) => item.quantity + ' ' + item.product.title.concat(', '))}</p>
                                <p>Delivery: {deliveryMethod.company}</p>
                                <p>Total price: {getTotalPrice() + ' kr, incl delivery and VAT'}</p>
                            </Card>
                        </Col>
                        <Col span={24} style={buttonContainerStyle}>
                            <Route render={({ history }) => (
                                <Button
                                    type="primary"
                                    icon={<CheckCircleOutlined />}
                                    size={'large'}
                                    onClick={() => this.onPlaceOrderClick(history)}
                                    loading={disablePlaceOrderButton}
                                >
                                    <strong> Place order</strong>
                                </Button>
                            )}/>
                        </Col>
                        </>
                    );    
                }}
            </CartContext.Consumer>
        )
    }
}

export default CompleteOrder;

const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-3rem',
    marginBottom: '8rem'
}