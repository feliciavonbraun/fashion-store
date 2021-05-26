import { Avatar, List } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import React, { CSSProperties, useContext } from 'react';
import { Order, OrderContext } from '../../contexts/OrderContext';
// import { PaymentCard } from '../Cart/PayCard';
// import { PaymentKlarna } from '../Cart/PayKlarna';

interface Props {
    order: Order;
}

export default function AdminOrderListItem(props: Props) {
    const { updateOrder } = useContext(OrderContext);
    const { order } = props;
    // function handleChange = (value: string) => {
    //     console.log(value);
    // };

    /* function isKlarna(payment: any): payment is PaymentKlarna {
        return payment && payment.ssn && typeof payment.ssn == 'string';
    }

    function isCard(payment: any): payment is PaymentCard {
        return (
            payment &&
            payment.cardNumber &&
            typeof payment.cardNumber == 'string'
        );
    } */

    const changeOrderStatus = async (e: CheckboxChangeEvent) => {
        const isSent = e.target.checked;
        const updatedOrder = { ...order, isSent: isSent };
        await updateOrder(updatedOrder);
    };

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
            {/* {isKlarna(props.order.deliveryMethod) ? (
                <p style={orderInfo}>Payment method: Klarna</p>
            ) : isCard(props.order.deliveryMethod) ? (
                <p style={orderInfo}>Payment method: Card</p>
            ) : (
                <p style={orderInfo}>Payment method: Swish</p>
            )} */}
            <p style={orderInfo}>
                {`Total order price: ${
                    order.totalprice
                } kr, incl delivery (VAT: ${order.totalprice * 0.25} kr)`}
            </p>
            <p>Status: {order.isSent ? 'Sent' : 'Proccessing'}</p>
            <Checkbox
                defaultChecked={order.isSent}
                onChange={changeOrderStatus}
            >
                Order has been sent
            </Checkbox>
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
