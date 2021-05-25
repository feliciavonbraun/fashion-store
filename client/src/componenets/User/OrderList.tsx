import { List } from 'antd';
import { Component, ContextType } from 'react';
import { Order } from '../../interfaces';
import OrderListItem from './OrderListItem';
import { OrderContext } from '../../contexts/OrderContext';

interface State {
    orders: Order[];
}

export default class OrderList extends Component<{}, State> {
    context!: ContextType<typeof OrderContext>;
    static contextType = OrderContext;

    state: State = {
        orders: [
            {
                cart: [
                    {
                        product: {
                            _id: '1',
                            description:
                                'Basic Tee is a round neck, short sleeve tee in jersey rib. It has a short sleeve that ends in elbow length. The fabric is the softest modal rib blended with elastane for good recovery.',
                            imageUrl:
                                'https://github.com/msmalinosterberg/miniprojekt/blob/master/src/assets/prod5.png?raw=true',
                            price: 299,
                            title: 'BASIC TEE WITH PRINT',
                            qty: 10,
                            category: ['Shirts'],
                        },
                        quantity: 1,
                    },
                    {
                        product: {
                            _id: '2',
                            description:
                                'Cropped hoodie finished with a drawstring detail at the hem. Comes with matching pants. The perfect set.',
                            imageUrl:
                                'https://github.com/msmalinosterberg/miniprojekt/blob/master/src/assets/prod4.png?raw=true',
                            price: 299,
                            title: 'HOODIE AND PANTS',
                            qty: 10,
                            category: ['Shirts, Pants'],
                        },
                        quantity: 2,
                    },
                ],
                deliveryMethod: 'PostNord',
                paymentMethod: {
                    cardNumber: '12332132333333',
                    expDate: '1231',
                    cvc: '12312',
                    cardName: 'Maria Norén',
                },
                totalPrice: 1243,
                userInfo: {
                    name: 'Maria Helena Norén',
                    city: 'Göteborg',
                    email: 'marialinder97@hotmail.com',
                    phone: '0761113411',
                    street: 'Birger Jarlsgatan 2 LGH 1214',
                    zipcode: '41469',
                },
                isSent: false,
                _id: '90574390534u5n0c3450390',
            },
            {
                cart: [
                    {
                        product: {
                            _id: '1',
                            description:
                                'Basic Tee is a round neck, short sleeve tee in jersey rib. It has a short sleeve that ends in elbow length. The fabric is the softest modal rib blended with elastane for good recovery.',
                            imageUrl:
                                'https://github.com/msmalinosterberg/miniprojekt/blob/master/src/assets/prod5.png?raw=true',
                            price: 299,
                            title: 'BASIC TEE WITH PRINT',
                            qty: 10,
                            category: ['Shirts'],
                        },
                        quantity: 1,
                    },
                ],
                deliveryMethod: 'PostNord',
                paymentMethod: {
                    phone: '0761113411',
                },
                totalPrice: 645,
                userInfo: {
                    name: 'Maria Helena Norén',
                    city: 'Göteborg',
                    email: 'marialinder97@hotmail.com',
                    phone: '0761113411',
                    street: 'Birger Jarlsgatan 2 LGH 1214',
                    zipcode: '41469',
                },
                isSent: true,
                _id: '90574390534u5n0c3450390',
            },
        ],
    };

    render() {
        return (
            <OrderContext.Consumer>
                {({ allOrders }) => {
                    return (
                        <List
                            itemLayout='vertical'
                            dataSource={this.state.orders}
                            renderItem={(order) => (
                                <OrderListItem order={order} />
                            )}
                        ></List>
                    );
                }}
            </OrderContext.Consumer>
        );
    }
}
