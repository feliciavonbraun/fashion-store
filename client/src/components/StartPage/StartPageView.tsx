import { useContext, useEffect, useState } from 'react';
import { Product, ProductContext } from '../../contexts/ProductContext';
import CarouselStart from './Carousel';
import CategoryMenu from './Categorycard';
import ProductCardGrid from './ProductCardGrid';

export default function StartPageView() {
    const productContext = useContext(ProductContext);
    const { getProducts, getCategoryProducts } = productContext;
    const [category, setCategory] = useState<string>();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (category) {
                const products = await getCategoryProducts(category);
                setProducts(products);
            } else {
                const products = await getProducts();
                setProducts(products);
            }
        };
        fetchProducts();
        return function cleanup() {};
    }, [category, getProducts, getCategoryProducts]);

    return (
        <div>
            <CarouselStart />
            <CategoryMenu setCategory={setCategory} />
            <ProductCardGrid products={products} />
        </div>
    );
}
