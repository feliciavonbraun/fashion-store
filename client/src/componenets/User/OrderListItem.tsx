import { List, Avatar } from "antd";
import { CSSProperties } from "react";
import { Order } from "../../contexts/OrderContext";

interface Props {
    order: Order;
}

export default function Oli(props: Props) {


    // function handleChange = (value: string) => {
    //     console.log(value);
    // };

    // function isKlarna(payment: any): payment is PaymentKlarna {
    //     return payment && payment.ssn && typeof payment.ssn == "string";
    // }

    // function isCard(payment: any): payment is PaymentCard {
    //     return (
    //         payment && payment.cardNumber && typeof payment.cardNumber == "string"
    //     );
    // }

    return (
        <List.Item style={listItem}>
            <List.Item.Meta title={`Order: ${props.order._id}`} />
            <p style={orderInfo}>{props.order.firstname}</p>
            <p style={orderInfo}>{props.order.email}</p>
            <p style={orderInfo}>{props.order.phone}</p>
            <p style={orderInfo}>{props.order.street}</p>
            <p style={orderInfo}>{props.order.city}</p>
            <p style={orderInfo}>{props.order.zipcode}</p>
            <List
                style={itemsList}
                itemLayout="vertical"
                dataSource={props.order.cart}
                renderItem={(cartItem) => (
                    <List.Item>
                        <List.Item.Meta
                            title={cartItem.product.title}
                            avatar={<Avatar src={cartItem.product.imageUrl} />}
                            description={cartItem.product.description}
                        />
                        <div style={itemInfo}>
                            <p>
                                Price: <b>{cartItem.product.price * cartItem.quantity} kr</b>
                            </p>
                            <p style={marginLeft}>
                                Quantity: <b>{cartItem.quantity}</b>
                            </p>
                        </div>
                    </List.Item>
                )}
            ></List>
            {/* <p style={orderInfo}>
                {` Delivery method: ${props.order.deliveryMethod}`}
            </p>
            { isKlarna(props.order.paymentMethod) ? 
                ( <p style={orderInfo}>Payment method: Klarna</p>) 
            : isCard(props.order.paymentMethod) ? 
                (<p style={orderInfo}>Payment method: Card</p>) 
            : (<p style={orderInfo}>Payment method: Swish</p>
            )}
            <p style={orderInfo}>{`Total order price: ${props.order.totalPrice
                } kr, incl delivery (VAT: ${props.order.totalPrice * 0.25
                } kr)`}
            </p> */}
            <p style={status}>
                Status: <b>{props.order.isSent ? "Sent" : "Proccessing"}</b>
            </p>
        </List.Item>
    )
}

const listItem: CSSProperties = {
    marginBottom: "2rem",
    padding: "1rem",
    border: "1px solid lightgrey",
};

const itemsList: CSSProperties = {
    marginTop: "1rem",
};

const itemInfo: CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
};

const marginLeft: CSSProperties = {
    marginLeft: "0.5rem",
};

const orderInfo: CSSProperties = {
    margin: "0 0 0.25rem 0",
};

const status: CSSProperties = {
    marginTop: "1rem",
};