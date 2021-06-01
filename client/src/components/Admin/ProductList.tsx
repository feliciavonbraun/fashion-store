import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';
import { CSSProperties, useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';

interface Props extends RouteComponentProps {}

function ProductList(props: Props) {
    const productContext = useContext(ProductContext);
    const { allProducts } = productContext;

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1 style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                    PRODUCTS
                </h1>
                <Link to={`${props.match.url}/add-product`}>
                    <Button type='primary' icon={<PlusOutlined />}>
                        Add product
                    </Button>
                </Link>
            </div>

            <List
                grid={{
                    gutter: 12,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 1,
                    xxl: 1,
                }}
                dataSource={allProducts}
                renderItem={(item) => (
                    <List.Item>
                        <Link
                            to={`${props.match.url}/edit-product/${item._id}`}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        size={64}
                                        src={'/uploads/' + item.imageUrl}
                                    />
                                }
                                title={item.title}
                                description={[item.description.split('.')[0]]}
                            />
                            <p style={editStyle}>edit</p>
                        </Link>
                    </List.Item>
                )}
            />
        </>
    );
}
export default withRouter(ProductList);

const editStyle: CSSProperties = {
    color: 'red',
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: '1px solid lightgrey',
    alignItems: 'center',
};
