import { Form, Input, Button, Col, Row, message } from 'antd';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import {
    NewProduct,
    Product,
    ProductContext,
} from '../../contexts/ProductContext';
import { Select } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

interface Props extends RouteComponentProps<{ id: string }> {}

const successSave = () => {
    message.success('The product has been updated', 3);
};

const successDelete = () => {
    message.success('The product has been deleted', 3);
};

function AdminEditDetails(props: Props) {
    const history = useHistory();
    const _id = props.match.params.id;
    const productContext = useContext(ProductContext);
    const { getProduct, updateProduct, deleteProduct, allCategories } =
        productContext;
    const [buttonSaveLoading, setButtonSaveLoading] = useState(false);
    const [buttonDeleteLoading, setButtonDeleteLoading] = useState(false);
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetch = async () => {
            const product = await getProduct(_id);
            setProduct(product);
            console.log(product);
        };
        fetch();
    }, [_id, getProduct]);

    const onFinish = async (product: NewProduct) => {
        setButtonSaveLoading(true);
        const updatedProduct = { ...product, _id: _id };
        await updateProduct(updatedProduct);
        successSave();
        history.push('/product-list');
    };

    const handleDelete = async () => {
        setButtonDeleteLoading(true);
        await deleteProduct(product!);
        successDelete();
        history.push('/product-list');
    };

    return (
        <div>
            <Row style={ContainerStyle}>
                <Col span={24} style={columnStyle}>
                    {product ? (
                        <Form
                            {...layout}
                            name='nest-messages'
                            onFinish={onFinish}
                            validateMessages={validateMessages}
                            initialValues={{
                                product: {
                                    title: product.title,
                                    description: product.description,
                                    price: product.price,
                                    imageUrl: product.imageUrl,
                                    qty: product.qty,
                                },
                            }}
                        >
                            <h1
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                EDIT
                            </h1>
                            <Form.Item
                                name={'title'}
                                label='Title'
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea defaultValue={product.title} />
                            </Form.Item>

                            <Form.Item
                                initialValue={product.description}
                                name={'description'}
                                label='Description'
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea
                                    defaultValue={product.description}
                                />
                            </Form.Item>

                            <Form.Item
                                initialValue={product.price}
                                name={'price'}
                                label='Price'
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea defaultValue={product.price} />
                            </Form.Item>

                            <Form.Item
                                initialValue={product.imageUrl}
                                name={'imageUrl'}
                                label='ImageUrl'
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea
                                    defaultValue={product.imageUrl}
                                />
                            </Form.Item>

                            <Form.Item
                                name={'category'}
                                label='Categories'
                                rules={[{ required: true }]}
                            >
                                <Select
                                    defaultValue={product.category}
                                    mode='tags'
                                    style={{ width: '100%' }}
                                    tokenSeparators={[',']}
                                >
                                    {allCategories.map((category) => (
                                        <Option
                                            checked={true}
                                            value={category}
                                            key={category}
                                        >
                                            {category}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                initialValue={product.qty}
                                name={'qty'}
                                label='Storage qty'
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea defaultValue={product.qty} />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={buttonSaveLoading}
                                    >
                                        Save
                                    </Button>

                                    <Button
                                        type='primary'
                                        danger
                                        onClick={handleDelete}
                                        loading={buttonDeleteLoading}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    ) : null}
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(AdminEditDetails);

const ContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '70%',
    margin: 'auto',
};

const columnStyle: CSSProperties = {
    marginTop: '10rem',
    paddingBottom: '8rem',
};
