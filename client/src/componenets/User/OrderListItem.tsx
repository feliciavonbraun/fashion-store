import { List, Avatar } from "antd";
import { Component } from "react";
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
      <List.Item actions={[]}>
        <List.Item.Meta title={`Order ${this.state.order._id}`} />
        <p>{this.state.order.userInfo.name}</p>
        <p>{this.state.order.userInfo.email}</p>
        <p>{this.state.order.userInfo.phone}</p>
        <p>{this.state.order.userInfo.street}</p>
        <p>{this.state.order.userInfo.city}</p>
        <p>{this.state.order.userInfo.zipcode}</p>
        <List
          itemLayout="horizontal"
          dataSource={this.state.order.cart}
          renderItem={(cartItem) => (
            <List.Item>
              <List.Item.Meta
                title={cartItem.product.title}
                avatar={<Avatar src={cartItem.product.imageUrl} />}
                description={cartItem.product.description}
              />
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "0.5rem" }}>
                  Price: <b>{cartItem.product.price * cartItem.quantity} kr</b>
                </p>
                <p>
                  Quantity: <b>{cartItem.quantity}</b>
                </p>
              </div>
            </List.Item>
          )}
        ></List>
        <p>
          Delivery method: <b>{this.state.order.deliveryMethod}</b>
        </p>
        {this.isKlarna(this.state.order.paymentMethod) ? (
          <p>
            Payment method: <b>Swish</b>
          </p>
        ) : this.isCard(this.state.order.paymentMethod) ? (
          <p>
            Payment method: <b>Card</b>
          </p>
        ) : (
          <p>
            Payment method: <b>Swish</b>
          </p>
        )}
        <p>
          Total order price: <b>{this.state.order.totalPrice} kr</b>
        </p>
        <h3>
          {this.state.order.isSent
            ? "Order has been sent to choosen delivery company"
            : "Order is being proccessed"}
        </h3>
      </List.Item>
    );
  }
}
