import {  createContext, useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

export interface DeliveryMethods {
    _id: string;
    company: string;
    time: number;
    price: number;
}

export interface DeliveryValue {
    allDeliveryMethods: DeliveryMethods[];
    calculateDeliveryDay: (timeInHours: number) => string;
}

interface Props {
    children: object;
}

export const DeliveryContext = createContext<DeliveryValue>({} as DeliveryValue);
function DeliveryProvider({children}: Props) {
    const [allDeliveryMethods, setDeliveryMethod] = useState<DeliveryMethods[]>([]);


    useEffect(() => {
        async function getDeliveryMethods() {
            const delivery = await makeRequest('/api/delivery', 'GET');
            console.log(delivery, "HEJDÅ")
            setDeliveryMethod(delivery);
        }
        getDeliveryMethods();
    }, [setDeliveryMethod]);
    console.log('TEST')

    const calculateDeliveryDay = (timeInHours: number) => {
        const today = new Date()
        const deliveryDay = new Date(today);
        deliveryDay.setDate(deliveryDay.getDate() + timeInHours / 24);
        return deliveryDay.toISOString().split('T')[0]; 
    }

    return(
        <DeliveryContext.Provider value =
            {{
                allDeliveryMethods,
                calculateDeliveryDay
            }}
            >
                {children}
         </DeliveryContext.Provider>
    )

 
}

export default DeliveryProvider;



    


