import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, List, Row } from 'antd';
import { CSSProperties, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';

export default function ProductList() {
    const productContext = useContext(ProductContext);
    const { allProducts } = productContext;

    return (
        <Row style={containerStyle}>
            <Col style={columnStyle}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '2rem',
                        marginBottom: '3rem',
                    }}
                >
                    <h1 style={{ fontWeight: 'bold' }}>ADMIN</h1>
                    <Link to={'/product-list/add-product'}>
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
                            <Link to={'/product-list/edit-product/' + item._id}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar size={64} src={item.imageUrl} />
                                    }
                                    title={item.title}
                                    description={[
                                        item.description.split('.')[0],
                                    ]}
                                />
                                <p style={editStyle}>edit</p>
                            </Link>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    );
}

const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '8rem',
};

const columnStyle: CSSProperties = {
    marginTop: '8rem',
    width: '80%',
};

const editStyle: CSSProperties = {
    color: 'red',
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: '1px solid lightgrey',
    alignItems: 'center',
};
