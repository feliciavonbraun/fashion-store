import { useState, useContext } from 'react';
import { Form, Input, InputNumber, Button, message, Upload } from 'antd';
import { NewProduct, ProductContext } from '../../contexts/ProductContext';
import { Link, useHistory } from 'react-router-dom';
import { Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
        min: '${label} cannot be less than ${min}',
    },
};

const success = () => {
    message.success('The product has been published', 3);
};

const error = () => {
    message.error('Could not save product', 3);
};

const uploadError = () => {
    message.error('Invalid file, check if file type is jpg or png', 3);
};

export default function AddNewProduct() {
    const history = useHistory();
    const productContext = useContext(ProductContext);
    const [fileName, setFileName] = useState('');
    const { newProduct, allCategories } = productContext;
    const [buttonSaveLoading, setButtonSaveLoading] = useState(false);

    const onFinish = async (product: NewProduct) => {
        if (fileName) {
            const completedProduct: NewProduct = {
                ...product,
                imageUrl: fileName,
            };
            setButtonSaveLoading(true);
            const p = await newProduct(completedProduct);
            if (p._id) {
                success();
                history.push('/user/product-list');
            } else {
                error();
            }
        } else {
            uploadError();
        }
    };

    function handleFileChange(info: any) {
        if (info.file.status !== 'uploading') {
            console.log('file', info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            // Correct filename is set here
            setFileName(info.file.response);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    function handleBeforeUpload(file: any) {
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
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
            <Form
                {...layout}
                name='nest-messages'
                onFinish={onFinish}
                validateMessages={validateMessages}
                encType='multipar/form-data'
            >
                <h1
                    style={{
                        margin: '1rem 0',
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
                    getValueFromEvent={normFile}
                    valuePropName='fileList'
                    rules={[{ required: true }]}
                >
                    <Upload
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
                    rules={[{ required: true, type: 'number' }]}
                >
                    <InputNumber min={0} />
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
        </div>
    );
}
