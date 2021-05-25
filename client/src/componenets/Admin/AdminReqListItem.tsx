import { Checkbox, List } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useContext } from 'react';
import { User, UserContext } from '../../contexts/UserContext';

interface Props {
    user: User;
}

export default function AdminReqListItem(props: Props) {
    const { firstname, lastname, email } = props.user;
    const { responseAdminRequest } = useContext(UserContext);

    const handleChange = (e: CheckboxChangeEvent) => {
        responseAdminRequest(props.user, true);
    };

    return (
        <List.Item
            actions={[<Checkbox onChange={handleChange}>Approved</Checkbox>]}
        >
            <List.Item.Meta
                style={{ wordBreak: 'break-word' }}
                title={`${firstname} ${lastname}`}
                description={email}
            />
        </List.Item>
    );
}
