import { List, Select } from 'antd';
import { User } from '../../interfaces';

const { Option } = Select;

interface Props {
    user: User;
}

export default function UserListItem(props: Props) {
    const { firstname, lastname, email, role } = props.user;

    const handleChange = (value: string) => {
        console.log(value);
    };

    return (
        <List.Item
            actions={[
                <Select
                    defaultValue={role}
                    style={{ width: 120, right: 0 }}
                    onChange={handleChange}
                >
                    <Option value='customer'>Customer</Option>
                    <Option value='admin'>Admin</Option>
                </Select>,
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
