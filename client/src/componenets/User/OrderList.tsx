import { List, Col, Row } from "antd";
import { CSSProperties, useContext } from "react";
// import { Order } from "../../interfaces";
import { OrderContext } from "../../contexts/OrderContext";
import OrderListItem from "./OrderListItem";

// interface State {
//     orders: Order[];
// }

export default function OrderList() {

    // const orderContext = useContext(OrderContext);
    // const { allOrders } = orderContext;

    const { allOrders } = useContext(OrderContext);

    return (
        <Row style={containerStyle}>
            <Col style={columnStyle}>
                <List
                    itemLayout="vertical"
                    dataSource={allOrders}
                    renderItem={(order) => <OrderListItem order={order} />}
                >
                </List>
            </Col>
        </Row>
    );
};

const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '8rem',
    textAlign: 'left',
};

const columnStyle: CSSProperties = {
    marginTop: '8rem',
    width: '80%',
};