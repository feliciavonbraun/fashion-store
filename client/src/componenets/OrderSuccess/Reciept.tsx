import { Component, ContextType, CSSProperties } from 'react';
import { Card } from 'antd';
import { CartContext, PaymentMethod } from '../../contexts/CartContext';
import { OrderItem } from '../../contexts/OrderContext';

export interface IReceipt {
    cart: OrderItem[];
    deliveryMethod: string;
    totalPrice: number;
    paymentMethod: PaymentMethod;
}
class Receipt extends Component {
    context!: ContextType<typeof CartContext>;
    static contextType = CartContext;

    render() {
        return (
            <CartContext.Consumer>
                {({ receipt }) => {
                    return (
                        <Card title='Receipt' style={receiptStyle}>
                            <p>
                                Products:{' '}
                                {receipt.cart.map(
                                    (item) =>
                                        item.qty +
                                        ' ' +
                                        item.product.title.concat(', ')
                                )}
                            </p>
                            <p>Delivery: {receipt.deliveryMethod}</p>
                            <p>
                                Total price:{' '}
                                {receipt.totalPrice +
                                    ' kr, incl delivery (VAT: ' +
                                    receipt.totalPrice * 0.25 +
                                    ' kr.)'}
                            </p>
                        </Card>
                    );
                }}
            </CartContext.Consumer>
        );
    }
}

export default Receipt;

const receiptStyle: CSSProperties = {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5rem',
};
