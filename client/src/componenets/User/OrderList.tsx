import { List } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import OrderListItem from './OrderListItem';

export default function OrderList() {
    const { userOrders } = useContext(UserContext);

    return (
        <List
            itemLayout='vertical'
            dataSource={userOrders}
            renderItem={(order) => <OrderListItem order={order} />}
        ></List>
    );
}
