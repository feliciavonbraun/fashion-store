import { List, Avatar } from "antd";
import { Component, CSSProperties } from "react";
import { Order } from "../../interfaces";
import { PaymentCard } from "../Cart/PayCard";
import { PaymentKlarna } from "../Cart/PayKlarna";

interface Props {
  order: Order;
}

interface State {
  order: Order;
}

export default class OrderListItem extends Component<Props, State> {
  state: State = {
    order: this.props.order,
  };

  handleChange = (value: string) => {
    console.log(value);
  };

  isKlarna(payment: any): payment is PaymentKlarna {
    return payment && payment.ssn && typeof payment.ssn == "string";
  }

  isCard(payment: any): payment is PaymentCard {
    return (
      payment && payment.cardNumber && typeof payment.cardNumber == "string"
    );
  }
  render() {
    return (
      <List.Item style={listItem}>
        <List.Item.Meta title={`Order ${this.state.order._id}`} />
        <p style={orderInfo}>{this.state.order.userInfo.name}</p>
        <p style={orderInfo}>{this.state.order.userInfo.email}</p>
        <p style={orderInfo}>{this.state.order.userInfo.phone}</p>
        <p style={orderInfo}>{this.state.order.userInfo.street}</p>
        <p style={orderInfo}>{this.state.order.userInfo.city}</p>
        <p style={orderInfo}>{this.state.order.userInfo.zipcode}</p>
        <List
          style={itemsList}
          itemLayout="vertical"
          dataSource={this.state.order.cart}
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
        <p
          style={orderInfo}
        >{` Delivery method: ${this.state.order.deliveryMethod}`}</p>
        {this.isKlarna(this.state.order.paymentMethod) ? (
          <p style={orderInfo}>Payment method: Klarna</p>
        ) : this.isCard(this.state.order.paymentMethod) ? (
          <p style={orderInfo}>Payment method: Card</p>
        ) : (
          <p style={orderInfo}>Payment method: Swish</p>
        )}
        <p style={orderInfo}>{`Total order price: ${
          this.state.order.totalPrice
        } kr, incl delivery (VAT: ${
          this.state.order.totalPrice * 0.25
        } kr)`}</p>
        <p style={status}>
          Status: <b>{this.state.order.isSent ? "Sent" : "Proccessing"}</b>
        </p>
      </List.Item>
    );
  }
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
