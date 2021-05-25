import { List } from 'antd';
import { CSSProperties } from 'react';
import { Order } from '../../contexts/OrderContext';
import { PaymentCard } from '../Cart/PayCard';
import { PaymentKlarna } from '../Cart/PayKlarna';

interface Props {
    order: Order;
}

export default function OrderListItem(props: Props) {
    // function handleChange = (value: string) => {
    //     console.log(value);
    // };

    function isKlarna(payment: any): payment is PaymentKlarna {
        return payment && payment.ssn && typeof payment.ssn == 'string';
    }

    function isCard(payment: any): payment is PaymentCard {
        return (
            payment &&
            payment.cardNumber &&
            typeof payment.cardNumber == 'string'
        );
    }

    return (
        <List.Item style={listItem}>
            <List.Item.Meta title={`Order: ${props.order._id}`} />
            {/*             <p style={orderInfo}>{props.order.user.firstname}</p>
            <p style={orderInfo}>{props.order.user.email}</p> */}
            <p style={orderInfo}>{props.order.address.phone}</p>
            <p style={orderInfo}>{props.order.address.street}</p>
            <p style={orderInfo}>{props.order.address.city}</p>
            <p style={orderInfo}>{props.order.address.zipcode}</p>
            <List
                style={itemsList}
                itemLayout='vertical'
                dataSource={props.order.orderItems}
                renderItem={(orderItem) => (
                    <List.Item>
                        <List.Item.Meta
                        // title={orderItem.product.title}
                        // avatar={<Avatar src={orderItem.product.imageUrl} />}
                        // description={orderItem.product.description}
                        />
                        <div style={itemInfo}>
                            <p>
                                {/* Price: <b>{orderItem.price * orderItem.qty} kr</b> */}
                            </p>
                            <p style={marginLeft}>
                                Quantity: <b>{orderItem.qty}</b>
                            </p>
                        </div>
                    </List.Item>
                )}
            ></List>
            <p style={orderInfo}>
                {`Delivery method: ${props.order.deliveryMethod}`}
            </p>
            {isKlarna(props.order.deliveryMethod) ? (
                <p style={orderInfo}>Payment method: Klarna</p>
            ) : isCard(props.order.deliveryMethod) ? (
                <p style={orderInfo}>Payment method: Card</p>
            ) : (
                <p style={orderInfo}>Payment method: Swish</p>
            )}
            <p style={orderInfo}>
                {`Total order price: ${
                    props.order.totalprice
                } kr, incl delivery (VAT: ${props.order.totalprice * 0.25} kr)`}
            </p>
            <p style={status}>
                Status: <b>{props.order.isSent ? 'Sent' : 'Proccessing'}</b>
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
