import { Avatar, List } from 'antd';
import { CSSProperties } from 'react';
import { Order } from '../../contexts/OrderContext';

interface Props {
    order: Order;
}

export default function OrderListItem(props: Props) {
    const { order } = props;

    return (
        <List.Item style={listItem}>
            <List.Item.Meta title={`Order: ${order._id}`} />
            <p style={orderInfo}>{order.user.firstname}</p>
            <p style={orderInfo}>{order.user.email}</p>
            <p style={orderInfo}>{order.address.phone}</p>
            <p style={orderInfo}>{order.address.street}</p>
            <p style={orderInfo}>{order.address.city}</p>
            <p style={orderInfo}>{order.address.zipcode}</p>
            <List
                style={itemsList}
                itemLayout='vertical'
                dataSource={order.orderItems}
                renderItem={(orderItem) => (
                    <List.Item>
                        <List.Item.Meta
                            title={orderItem.product.title}
                            avatar={<Avatar src={orderItem.product.imageUrl} />}
                            description={orderItem.product.description}
                        />
                        <div style={itemInfo}>
                            <p>
                                Price:{' '}
                                <b>
                                    {orderItem.product.price * orderItem.qty} kr
                                </b>
                            </p>
                            <p style={marginLeft}>
                                Quantity: <b>{orderItem.qty}</b>
                            </p>
                        </div>
                    </List.Item>
                )}
            ></List>
            <p style={orderInfo}>
                {`Delivery method: ${order.delivery.company}`}
            </p>
            <p style={orderInfo}>
                {`Total order price: ${
                    order.totalprice
                } kr, incl delivery (VAT: ${order.totalprice * 0.25} kr)`}
            </p>
            <p style={status}>
                Status: <b>{order.isSent ? 'Sent' : 'Proccessing'}</b>
            </p>
        </List.Item>
    );
}

const listItem: CSSProperties = {
    marginBottom: '2rem',
    padding: '1rem',
    border: '1px solid lightgrey',
};

const itemsList: CSSProperties = {
    marginTop: '1rem',
};

const itemInfo: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
};

const marginLeft: CSSProperties = {
    marginLeft: '0.5rem',
};

const orderInfo: CSSProperties = {
    margin: '0 0 0.25rem 0',
};

const status: CSSProperties = {
    marginTop: '1rem',
};
