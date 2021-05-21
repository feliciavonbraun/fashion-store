import { Row, Col, message, Button } from 'antd';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Image } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Product, ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';

interface Props extends RouteComponentProps<{ id: string }> {}

const success = () => {
    message.success('The product was added to the cart', 5);
};

function ProductDetails(props: Props) {
    const productContext = useContext(ProductContext);
    const { getProduct } = productContext;
    const cartContext = useContext(CartContext);
    const { addProductToCart } = cartContext;
    const _id = props.match.params.id;
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetch = async () => {
            const product = await getProduct(_id);
            setProduct(product);
        };
        fetch();
    }, [_id, getProduct]);

    console.log(_id);

    const handleAddClick = () => {
        success();
        addProductToCart(product!, undefined);
    };

    return (
        <Row style={detailContainer}>
            {product ? (
                <>
                    <Col lg={{ span: 10 }} style={columnStyle}>
                        <Image src={product.imageUrl} />
                    </Col>

                    <Col lg={{ span: 10 }} style={columnStyle}>
                        <h2 style={titleStyle}>{product.title}</h2>
                        <h4>{product.description} </h4>
                        <h2 style={price}>{product.price + ' kr'} </h2>
                        <Button
                            type='primary'
                            style={{
                                marginTop: '1rem',
                                width: '8rem',
                                marginBottom: '6rem',
                            }}
                            onClick={handleAddClick}
                        >
                            Add to cart
                        </Button>
                    </Col>
                </>
            ) : null}
        </Row>
    );
}

export default withRouter(ProductDetails);

const detailContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    margin: 'auto',
};

const columnStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    marginBottom: '5rem',
};

const titleStyle: CSSProperties = {
    fontSize: '2rem',
};

const price: CSSProperties = {
    fontWeight: 'bold',
};
