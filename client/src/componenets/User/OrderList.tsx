import { List } from 'antd';
import { useContext } from 'react';
// import { Order } from "../../interfaces";
import { OrderContext } from '../../contexts/OrderContext';
import OrderListItem from './OrderListItem';

// interface State {
//     orders: Order[];
// }

export default function OrderList() {
    // const orderContext = useContext(OrderContext);
    // const { allOrders } = orderContext;

    const { allOrders } = useContext(OrderContext);

    return (
        <List
            itemLayout='vertical'
            dataSource={allOrders}
            renderItem={(order) => <OrderListItem order={order} />}
        ></List>
    );
};