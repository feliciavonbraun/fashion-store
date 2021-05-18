import { Avatar, Col, List, Row, InputNumber } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { Product } from '../ProductItemsList';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export interface CartItem {
    product: Product;
    quantity: number;
}
class CartItemsList extends Component {
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;
      
    handleDelete = (id: number) => {
        const { deleteProductFromCart } = this.context;
        deleteProductFromCart(id as number);
    }

    onChangeQuantity(quantity: number, product: Product) {
        const { addProductToCart } = this.context;
        addProductToCart(product, quantity);
    }
    
    render() {
        return (
            <CartContext.Consumer>
                {({ cart }) => {
                    return (
                        <Row style={listContainerStyle}>
                            <Col span={24} style={columnStyle}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={cart}
                                    renderItem={item => (
                                    <List.Item
                                        actions={[<button key="delete-item" 
                                        style={deleteStyle}
                                        onClick={() => this.handleDelete(item.product.id)}>delete</button>]}>
                                        <List.Item.Meta                    
                                            avatar={<Avatar src={item.product.imageUrl} />}
                                            title={<Link to={'/product/' + item.product.id}>{item.product.title}</Link>}
                                            description={[<span style={descriptionStyle}>{item.product.description.substring(0, 35) + '...'}</span>,
                                            <InputNumber min={1} max={10} defaultValue={item.quantity} onChange={(value) => this.onChangeQuantity(value, item.product)} style={numberInputStyle} />,
                                            item.product.price * item.quantity + ' kr']}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    )
                }}
            </CartContext.Consumer>
        )
    }
}

const listContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto',
}

const columnStyle: CSSProperties = {
    marginTop: '12rem',
    marginBottom: '3rem',
}

const numberInputStyle: CSSProperties = {
    marginTop: window.innerWidth > 768 ? '0' : '1rem',
    marginRight: window.innerWidth > 768 ? '8rem' : '1rem',
    marginLeft: window.innerWidth > 768 ? '8rem' : '0',
}

const deleteStyle: CSSProperties = {
    color: 'red',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1.2rem'
}

const descriptionStyle: CSSProperties = {
    fontFamily: 'Roboto Mono'
}

export default CartItemsList;