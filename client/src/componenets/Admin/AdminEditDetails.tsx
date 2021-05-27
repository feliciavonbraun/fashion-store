import { Form, Input, Button, message, InputNumber } from 'antd';
import { useContext, useEffect, useState } from 'react';
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
        };
        fetch();
    }, [_id, getProduct]);

    const onFinish = async (product: NewProduct) => {
        setButtonSaveLoading(true);
        const updatedProduct = { ...product, _id: _id };
        await updateProduct(updatedProduct);
        successSave();
        history.goBack();
    };

    const handleDelete = async () => {
        setButtonDeleteLoading(true);
        await deleteProduct(product!);
        successDelete();
        history.goBack();
    };

    return (
        <div>
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
                            margin: '1rem 0',
                            display: 'flex',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        EDIT
                    </h1>
                    <Form.Item
                        initialValue={product.title}
                        name={'title'}
                        label='Title'
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        initialValue={product.description}
                        name={'description'}
                        label='Description'
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        initialValue={product.price}
                        name={'price'}
                        label='Price'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    <Form.Item
                        initialValue={product.imageUrl}
                        name={'imageUrl'}
                        label='ImageUrl'
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        initialValue={product.category}
                        name={'category'}
                        label='Categories'
                        rules={[{ required: true }]}
                    >
                        <Select
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
                        <InputNumber />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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
        </div>
    );
}

export default withRouter(AdminEditDetails);
