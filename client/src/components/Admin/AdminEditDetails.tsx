import { Form, Input, Button, message, InputNumber, Upload } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import {
    Link,
    RouteComponentProps,
    useHistory,
    withRouter,
} from 'react-router-dom';
import {
    NewProduct,
    Product,
    ProductContext,
} from '../../contexts/ProductContext';
import { Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

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

const uploadError = () => {
    message.error('Invalid file, file must be of type jpg or png', 3);
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
    const [fileName, setFileName] = useState('');

    const defaultFileList: UploadFile<any>[] = [
        {
            uid: '1',
            size: 0,
            type: 'image/png',
            name: product?.imageUrl || '',
            status: 'done',
            response: `${product?.imageUrl}`,
            url: `/uploads/${product?.imageUrl}`,
        },
    ];

    useEffect(() => {
        const fetch = async () => {
            const product = await getProduct(_id);
            setProduct(product);
            setFileName(product.imageUrl);
        };
        fetch();
    }, [_id, getProduct]);

    const onFinish = async (product: NewProduct) => {
        if (fileName) {
            setButtonSaveLoading(true);
            const updatedProduct = { ...product, _id: _id, imageUrl: fileName };
            await updateProduct(updatedProduct);
            successSave();
            history.goBack();
        } else {
            uploadError();
        }
    };

    const handleDelete = async () => {
        setButtonDeleteLoading(true);
        await deleteProduct(product!);
        successDelete();
        history.goBack();
    };

    function handleFileChange(info: any) {
        if (info.file.status !== 'uploading') {
            console.log('file', info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            // Correct filename is set here
            setFileName(info.file.response);
            message.success(`${info.file.name} uploaded successfully`);
        } else if (info.file.status === 'error') {
            setFileName('');
            message.error(`${info.file.name} upload failed.`);
        }
    }

    function handleBeforeUpload(file: any) {
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setFileName('');
            message.error('You can only upload JPG/PNG file');
        }
        return isJpgOrPng;
    }

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
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
                        name={'imageUrl'}
                        label='Image'
                        initialValue={defaultFileList}
                        getValueFromEvent={normFile}
                        valuePropName='fileList'
                        rules={[{ required: true }]}
                    >
                        <Upload
                            defaultFileList={defaultFileList}
                            name='imageUrl'
                            action='/api/upload'
                            listType='picture'
                            maxCount={1}
                            beforeUpload={handleBeforeUpload}
                            onChange={handleFileChange}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload (Max: 1)
                            </Button>
                        </Upload>
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
                            <Link to={'/user/product-list'}>
                                <Button type='ghost'>Cancel</Button>
                            </Link>
                            <div>
                                <Button
                                    type='primary'
                                    danger
                                    style={{ marginRight: '.3rem' }}
                                    onClick={handleDelete}
                                    loading={buttonDeleteLoading}
                                >
                                    Delete
                                </Button>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={buttonSaveLoading}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            ) : null}
        </div>
    );
}

export default withRouter(AdminEditDetails);
