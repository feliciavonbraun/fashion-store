import { createContext,  useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';


export interface Product {
    _id: string,
    name: string,
    price: number,
    image: string,
    qty: number,
    category: [],
    description: string
};

interface ProductValue {
    allProducts: Product[]
}

interface Props {
    children: Object;
}

export const ProductContext = createContext<ProductValue>({} as ProductValue);
function ProductProvider({children}: Props) {
    const [allProducts, setAllProducts] = useState<Product[]>([])

    
    useEffect(() => {
        async function getProduct() {
            
            console.log('HEJ')
            const products = await makeRequest('/api/products', 'GET');
            console.log(products, 'HEJ')
            setAllProducts(products);
        }
        getProduct();
    }, [setAllProducts]);
    console.log('hej')
    
    return(
        <ProductContext.Provider value=
            {{
                allProducts,

            }}
        >
            { children }
        </ProductContext.Provider>
    )
}

export default ProductProvider;