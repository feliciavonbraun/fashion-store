import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';

export interface Product {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
    qty: number;
    category: string[];
    description: string;
}

export interface NewProduct {
    title: string;
    price: number;
    imageUrl: string;
    qty: number;
    category: string[];
    description: string;
}

interface ProductValue {
    allProducts: Product[];
    allCategories: string[];
    getProduct: (_id: string) => Promise<Product>;
    getProducts: () => Promise<Product[]>;
    getCategoryProducts: (category: string) => Promise<Product[]>;
    updateProduct: (product: Product) => Promise<Product>;
    newProduct: (product: NewProduct) => Promise<Product>;
    deleteProduct: (product: Product) => Promise<Product>;
    setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

interface Props {
    children: Object;
}

export const ProductContext = createContext<ProductValue>({} as ProductValue);
function ProductProvider({ children }: Props) {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);

    // GETS PRODUCTS AND CATEGORIES ON MOUNT
    useEffect(() => {
        const fetchData = async () => {
            const products = await getProducts();
            const categories = await getCategories();
            setAllProducts(products);
            setAllCategories(categories);
        };
        fetchData();
    }, []);

    // GET ALL PRODUCTS
    const getProducts = async () => {
        const products = await makeRequest('/api/product', 'GET');
        return products;
    };

    // GET ALL CATEGORIES
    const getCategories = async () => {
        const categories = await makeRequest('/api/product/category', 'GET');
        return categories;
    };

    // UPDATES PRODUCTS AND CATEGORIES
    const updateProductsAndCategories = async () => {
        const products = await getProducts();
        setAllProducts(products);
        const categories = await getCategories();
        setAllCategories(categories);
    };

    // GET PRODUCTS OF A SPECIFIC CATEGORY
    const getCategoryProducts = async (category: string) => {
        const categories = await makeRequest(
            `/api/product/category/${category}`,
            'GET'
        );
        return categories;
    };

    // GET PRODUCT
    const getProduct = async (_id: string) => {
        const product: Product = await makeRequest(
            `/api/product/${_id}`,
            'GET'
        );
        return product;
    };

    // NEW PRODUCT
    const newProduct = async (product: NewProduct) => {
        const body = { ...product };
        const newProduct = await makeRequest('/api/product', 'POST', body);
        await updateProductsAndCategories();
        return newProduct;
    };

    // UPDATE PRODUCT
    const updateProduct = async (product: Product) => {
        const body = { ...product };
        const editedProduct = await makeRequest(
            `/api/product/${product._id}`,
            'PUT',
            body
        );
        await updateProductsAndCategories();
        return editedProduct;
    };

    // DELETE PRODUCT
    const deleteProduct = async (product: Product) => {
        const body = { ...product };
        const deletedProduct = await makeRequest(
            `/api/product/${product._id}`,
            'DELETE',
            body
        );
        await updateProductsAndCategories();
        return deletedProduct;
    };

    return (
        <ProductContext.Provider
            value={{
                allProducts,
                allCategories,
                getProduct,
                getProducts,
                getCategoryProducts,
                updateProduct,
                newProduct,
                deleteProduct,
                setAllProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
