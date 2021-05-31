import { List } from 'antd';
import { useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import AdminOrderListItem from './AdminOrderListItem';

export default function AdminOrderList() {
    const { allOrders } = useContext(OrderContext);

    return (
        <>
            <h1 style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                ALL ORDERS
            </h1>
            <List
                itemLayout='vertical'
                dataSource={allOrders}
                renderItem={(order) => <AdminOrderListItem order={order} />}
            ></List>
        </>
    );
}
