import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';

export interface Product {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
    qty: number;
    category: String[];
    description: string;
}

interface ProductValue {
    getProduct: (_id: string) => Promise<Product>;
    allProducts: Product[];
}

interface Props {
    children: Object;
}

export const ProductContext = createContext<ProductValue>({} as ProductValue);
function ProductProvider({ children }: Props) {
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getProducts() {
            const products = await makeRequest('/api/product', 'GET');
            setAllProducts(products);
            console.log(products);
        }
        getProducts();
    }, [setAllProducts]);

    const getProduct = async (_id: string) => {
        const product: Product = await makeRequest(
            `/api/product/${_id}`,
            'GET'
        );
        console.log(product);
        return product;
    };

    return (
        <ProductContext.Provider
            value={{
                allProducts,
                getProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
