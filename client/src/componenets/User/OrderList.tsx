import { List } from "antd";
import OrderListItem from "./OrderListItem";

export default function OrderList() {
  const orders = [
    {
      cart: [
        {
          product: {
            id: 1,
            description:
              "Basic Tee is a round neck, short sleeve tee in jersey rib. It has a short sleeve that ends in elbow length. The fabric is the softest modal rib blended with elastane for good recovery.",
            imageUrl:
              "https://github.com/msmalinosterberg/miniprojekt/blob/master/src/assets/prod5.png?raw=true",
            price: 299,
            title: "BASIC TEE WITH PRINT",
          },
          quantity: 1,
        },
      ],
      deliveryMethod: "PostNord",
      paymentMethod: {
        phone: "0761113411",
      },
      totalPrice: 1243,
      userInfo: {
        name: "Maria Helena Norén",
        city: "Göteborg",
        email: "marialinder97@hotmail.com",
        phone: "0761113411",
        street: "Birger Jarlsgatan 2 LGH 1214",
        zipcode: "41469",
      },
      isSent: false,
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={orders}
      renderItem={(order) => <OrderListItem order={order} />}
    ></List>
  );
}
