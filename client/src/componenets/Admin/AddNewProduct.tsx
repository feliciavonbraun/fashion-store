import { CSSProperties, useState, useContext } from 'react';
import { Form, Input, InputNumber, Button, Col, Row, message } from 'antd';
import { NewProduct, ProductContext } from '../../contexts/ProductContext';
import { useHistory } from 'react-router-dom';
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

const success = () => {
    message.success('The product has been published', 3);
};

export default function AddNewProduct() {
    const history = useHistory();
    const productContext = useContext(ProductContext);
    const { newProduct, allCategories } = productContext;
    const [buttonSaveLoading, setButtonSaveLoading] = useState(false);

    const onFinish = async (product: NewProduct) => {
        setButtonSaveLoading(true);
        await newProduct(product);
        success();
        history.push('/product-list');
    };

    return (
        <div>
            <Row style={ContainerStyle}>
                <Col span={24} style={columnStyle}>
                    <Form
                        {...layout}
                        name='nest-messages'
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <h1
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            ADD NEW PRODUCT{' '}
                        </h1>
                        <Form.Item
                            name={'title'}
                            label='Title'
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name={'description'}
                            label='Description'
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            name={'price'}
                            label='Price'
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>

                        <Form.Item
                            name={'imageUrl'}
                            label='ImageUrl'
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
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
                                    <Option value={category} key={category}>
                                        {category}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={'qty'}
                            label='Storage qty'
                            rules={[{ required: true }]}
                        >
                            <InputNumber />
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
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

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
