import { CSSProperties } from 'react';
import { Card } from 'antd';
import { Order } from '../../contexts/OrderContext';

interface Props {
    order: Order;
}

function Receipt(props: Props) {
    const { order } = props;

    return (
        <Card title='Receipt' style={receiptStyle}>
            <p>
                Products:{' '}
                {order.orderItems.map(
                    (item) => item.qty + ' ' + item.product.title.concat(', ')
                )}
            </p>
            <p>
                {order.user.firstname} {order.user.lastname}
            </p>
            <p>{order.user.email}</p>
            <p>{order.address.phone}</p>
            <p>
                {`${order.address.street}, ${order.address.zipcode}, 
                ${order.address.city}`}
            </p>
            <p>Delivery: {order.delivery.company}</p>
            <p>
                Total price:{' '}
                {order.totalprice +
                    ' kr, incl delivery (VAT: ' +
                    order.totalprice * 0.25 +
                    ' kr.)'}
            </p>
        </Card>
    );
}

export default Receipt;

const receiptStyle: CSSProperties = {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5rem',
};
