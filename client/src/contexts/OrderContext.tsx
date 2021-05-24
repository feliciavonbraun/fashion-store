import { createContext, useContext, useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";
import { User } from "./UserContext";
import { CartItem } from "../componenets/Cart/CartItemsList";
import { UserInfo } from "../componenets/Cart/InformationForm";
import { CartContext } from "./CartContext";


// TODO: hämta prudukter ur local storage ur cartcontext 
// ta in de andra contexterna 

export interface Order extends User {
    product: string, // in cart from CartContext
    qty: number, // in cart from CartContext

    phone: number, // in userInfo from CartContext
    street: string, // in userInfo from CartContext
    zipcode: number, // in userInfo from CartContext
    city: string, // in userInfo from CartContext

    _id: string, // skapas själv 
    totalprice: string, // finns
    isSent: boolean, 
    createdAt: Date, 

    // delivery context 
    user: User[],

    
};

interface NewOrder {
    cart: CartItem[],
    getTotalPrice: any,
    userInfo: UserInfo,

    isSent: boolean, 
    createdAt: Date,

    user: User[],
}

interface OrderValue {
    allOrders: Order[],
    getOneOrder: (_id: string) => void,
    newOrder: (newOrder: NewOrder) => void,
    updateOrder: (isSent: boolean) => void,
};

interface Props {
    children: Object;
};

export const OrderContext = createContext<OrderValue>({} as OrderValue);

function OrderProvider({ children }: Props) { // children kan skrivas annorlunda

    const [allOrders, setAllOrders] = useState<Order[]>([]);

    const { cart } = useContext(CartContext);
    console.log('Cart Items:', cart)

    const { getTotalPrice } = useContext(CartContext);
    console.log('totalPrice:', getTotalPrice);

    const { userInfo } = useContext(CartContext);
    console.log('userInfo:', userInfo) // innehåller för mkt saker 

    useEffect(() => {
        async function getOrders() {
            const orders = await makeRequest('/api/order', 'GET');
            console.log('ORDERS:', orders)
            setAllOrders(orders);
        }
        getOrders();
    }, [setAllOrders]);

    async function getOneOrder(_id: string) {
        const oneProduct: Order = await makeRequest(`/api/product/${_id}`, 'GET');
        return oneProduct;
    };

    async function newOrder(order: NewOrder) {
        // allt i interfacet + det importerade

        const body = { ...order }
        const newOrder = await makeRequest('/api/product', 'POST', body);
        console.log('Nya ordern:', newOrder);
        return newOrder;
    };

    async function updateOrder(isSent: boolean) {
        // isSent ska endast kunna uppdateras
    };

    return (
        <OrderContext.Provider
            value={{
                allOrders,
                getOneOrder,
                newOrder,
                updateOrder,
            }}
        >
            { children}
        </OrderContext.Provider>
    )
}
export default OrderProvider;