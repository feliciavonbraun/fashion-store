import { List } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AdminReqListItem from './AdminReqListItem';

export default function AdminReqList() {
    const { adminRequests } = useContext(UserContext);
    console.log(adminRequests);

    return (
        <>
            <h1 style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                ADMIN REQUESTS
            </h1>
            <List
                itemLayout='horizontal'
                dataSource={adminRequests}
                renderItem={(user) => <AdminReqListItem user={user} />}
            ></List>
        </>
    );
}
