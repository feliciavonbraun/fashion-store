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

export interface NewProduct {
    title: string;
    price: number;
    imageUrl: string;
    qty: number;
    category: String[];
    description: string;
}

interface ProductValue {
    getProduct: (_id: string) => Promise<Product>;
    updateProduct: (product: Product) => void;
    newProduct: (product: NewProduct) => Promise<Product>;
    deleteProduct: (product: Product) => void;
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
        return product;
    };

    const newProduct = async (product: NewProduct) => {
        const body = { ...product };
        const newProduct = await makeRequest('/api/product', 'POST', body);
        const products = await makeRequest('/api/product', 'GET');
        setAllProducts(products);
        return newProduct;
    };

    const updateProduct = async (product: Product) => {
        const body = { ...product };
        await makeRequest(`/api/product/${product._id}`, 'PUT', body);
        const products = await makeRequest('/api/product', 'GET');
        setAllProducts(products);
    };

    const deleteProduct = async (product: Product) => {
        const body = { ...product };
        await makeRequest(`/api/product/${product._id}`, 'DELETE', body);
        const products = await makeRequest('/api/product', 'GET');
        setAllProducts(products);
    };

    return (
        <ProductContext.Provider
            value={{
                allProducts,
                getProduct,
                updateProduct,
                newProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
