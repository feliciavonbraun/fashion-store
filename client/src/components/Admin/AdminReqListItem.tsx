import { Button, List } from 'antd';
import { useContext } from 'react';
import { User, UserContext } from '../../contexts/UserContext';

interface Props {
    user: User;
}

export default function AdminReqListItem(props: Props) {
    const { firstname, lastname, email } = props.user;
    const { responseAdminRequest } = useContext(UserContext);

    const handleClick = (response: boolean) => {
        responseAdminRequest(props.user, response);
    };

    return (
        <List.Item
            actions={[
                <>
                    <Button
                        style={{ marginRight: '0.5rem' }}
                        onClick={() => handleClick(true)}
                        type='primary'
                    >
                        Approve
                    </Button>
                    <Button onClick={() => handleClick(false)} type='text'>
                        Reject
                    </Button>
                </>,
            ]}
        >
            <List.Item.Meta
                style={{ wordBreak: 'break-word' }}
                title={`${firstname} ${lastname}`}
                description={email}
            />
        </List.Item>
    );
}
