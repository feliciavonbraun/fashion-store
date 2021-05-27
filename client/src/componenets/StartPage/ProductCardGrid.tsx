import React, { CSSProperties, useContext } from 'react';
import { Card, Col, List, Row, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

interface Props {
    products: Product[];
}

const { Meta } = Card;
const success = () => {
    message.success('The product was added to the cart', 5);
};

export default function ProductCardGrid(props: Props) {
    const { products } = props;
    const { cart, addProductToCart } = useContext(CartContext);

    const checkQty = (item: Product) => {
        const inCart = cart.find((cartItem) => cartItem.product._id === item._id);
        if (!inCart) {
            return 0
        }
        return inCart.qty
    };

    return (
        <Row style={cardContainer}>
            <Col span={24} style={columnStyle}>
                <List
                    grid={{
                        gutter: 25,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={products}
                    renderItem={(item) => (
                        <List.Item>
                            <Link to={'/product/' + item._id}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            src={item.imageUrl}
                                            alt='product'
                                        />
                                    }
                                    actions={[
                                        item.qty > checkQty(item) ? (
                                            <ShoppingCartOutlined
                                                style={{ fontSize: '2rem' }}
                                                onClick={(e) => {
                                                    success();
                                                    e.preventDefault();
                                                    addProductToCart(
                                                        item,
                                                        undefined
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <h3 style={{ color: 'grey' }}>
                                                Out of stock
                                            </h3>
                                        ),
                                    ]}
                                >
                                    <Meta
                                        title={item.title}
                                        description={item.price + ' kr'}
                                    />
                                </Card>
                            </Link>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    );
};

const cardContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    marginBottom: 'auto',
    marginTop: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingBottom: '8rem',
};

const columnStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3rem',
};