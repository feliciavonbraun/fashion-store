import { List } from 'antd';
import { useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import OrderListItem from './OrderListItem';

export default function OrderList() {
    const { allOrders } = useContext(OrderContext);

    return (
        <List
            itemLayout='vertical'
            dataSource={allOrders}
            renderItem={(order) => <OrderListItem order={order} />}
        ></List>
    );
}
