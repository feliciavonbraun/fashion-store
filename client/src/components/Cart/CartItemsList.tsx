import { Avatar, Col, List, Row, InputNumber } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { Product } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

class CartItemsList extends Component {
    context!: ContextType<typeof CartContext>;
    static contextType = CartContext;

    handleDelete = (id: string) => {
        const { deleteProductFromCart } = this.context;
        deleteProductFromCart(id);
    };

    onChangeQuantity(quantity: number, product: Product) {
        const { addProductToCart } = this.context;
        addProductToCart(product, quantity);
    };

    render() {
        return (
            <CartContext.Consumer>
                {({ cart }) => {
                    return (
                        <Row style={listContainerStyle}>
                            <Col span={24} style={columnStyle}>
                                <List
                                    itemLayout='horizontal'
                                    dataSource={cart}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={'item' + item.product._id}
                                            actions={[
                                                <button
                                                    key='delete-item'
                                                    style={deleteStyle}
                                                    onClick={() =>
                                                        this.handleDelete(
                                                            item.product._id
                                                        )
                                                    }
                                                >
                                                    delete
                                                </button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                key={'meta' + item.product._id}
                                                avatar={
                                                    <Avatar
                                                        src={
                                                            item.product.imageUrl
                                                        }
                                                    />
                                                }
                                                title={
                                                    <Link
                                                        to={
                                                            '/product/' +
                                                            item.product._id
                                                        }
                                                    >
                                                        {item.product.title}
                                                    </Link>
                                                }
                                                description={[
                                                    <span
                                                        style={descriptionStyle}
                                                        key={
                                                            'span' +
                                                            item.product._id
                                                        }
                                                    >
                                                        {item.product.description.substring(
                                                            0,
                                                            35
                                                        ) + '...'}
                                                    </span>,
                                                    <InputNumber
                                                        key={
                                                            'input' +
                                                            item.product._id
                                                        }
                                                        min={1}
                                                        max={
                                                            item.product.qty > 10
                                                                ? 10
                                                                : item.product.qty
                                                        }
                                                        defaultValue={item.qty}
                                                        onChange={(value) =>
                                                            this.onChangeQuantity(
                                                                value,
                                                                item.product
                                                            )
                                                        }
                                                        style={numberInputStyle}
                                                    />,
                                                    item.product.price * item.qty + ' kr',
                                                ]}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    );
                }}
            </CartContext.Consumer>
        );
    }
};

const listContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
};

const columnStyle: CSSProperties = {
    marginTop: '12rem',
    marginBottom: '3rem',
};

const numberInputStyle: CSSProperties = {
    marginTop: window.innerWidth > 768 ? '0' : '1rem',
    marginRight: window.innerWidth > 768 ? '8rem' : '1rem',
    marginLeft: window.innerWidth > 768 ? '8rem' : '0',
};

const deleteStyle: CSSProperties = {
    color: 'red',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1.2rem',
};

const descriptionStyle: CSSProperties = {
    fontFamily: 'Roboto Mono',
};

export default CartItemsList;