import { Form, Input, Button, Col, Row, message } from "antd";
import { Component, CSSProperties } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { Product } from "../ProductItemsList";

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
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

interface Props extends RouteComponentProps<{ id: string }> {}

interface State {
  products: Product[];
  product: Product | undefined;
  buttonSaveLoading: boolean;
  buttonDeleteLoading: boolean;
}

const successSave = () => {
  message.success('The product has been updated', 3);
};

const successDelete = () => {
  message.success('The product has been deleted', 3);
};

class AdminEditDetails extends Component<Props, State> {
  state: State = {
    products: JSON.parse(localStorage.getItem('products') as string) || [],
    product: undefined,
    buttonSaveLoading: false,
    buttonDeleteLoading: false,
  };

  onFinish = async (values: any) => {
    this.setState({ buttonSaveLoading: true });
    try {
      await saveDeleteProductMockApi();
    } catch (error) {
        console.log(error);
        return;
    }
    const products = JSON.parse(localStorage.getItem("products") as string) || [];
    const editedProduct: Product = {...this.state.product, ...values.product};
    const updatedProducts = products.map((item: Product) => item.id === editedProduct.id ? editedProduct : item);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    this.props.history.push('/admin-list');
    this.setState({ buttonSaveLoading: false });
  }

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('products') as string) || [];
    const product = products.find((p: Product) => p.id === Number(this.props.match.params.id));
    this.setState({ product: product });
  }

  handleDelete = async () => {
    this.setState({ buttonDeleteLoading: true });
    try {
      await saveDeleteProductMockApi();
    } catch (error) {
        console.log(error);
        return;
    }
    const products = JSON.parse(localStorage.getItem('products') as string) || [];
    const productId = this.state.product?.id;
    const newProducts = products.filter((item: Product) => item.id !== productId);
    localStorage.setItem('products', JSON.stringify(newProducts));
    this.props.history.push('/admin-list');
    this.setState({ buttonDeleteLoading: false });
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return <ErrorPage />
    }

    return (
      <div>
        <Row style={ContainerStyle}>
          <Col span={24} style={columnStyle}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
              initialValues={{
                product: {
                  title: this.state.product?.title,
                  description: this.state.product?.description,
                  price: this.state.product?.price,
                  imageUrl: this.state.product?.imageUrl,
                }
              }}
            >
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                EDIT
              </h1>
              <Form.Item name={["product", "title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={["product", "description"]} label="Description" rules={[{ required: true }]}>
                <Input.TextArea defaultValue={product.description}/>
              </Form.Item>

              <Form.Item name={["product", "price"]} label="Price" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              
              <Form.Item name={["product", "imageUrl"]} label="ImageUrl" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button 
                    type="primary"
                    onClick={() => {successSave();}} 
                    htmlType="submit" 
                    loading={this.state.buttonSaveLoading}
                  >
                    Save
                  </Button>

                  <Button 
                    type="primary" 
                    danger 
                    onClick={() => {this.handleDelete(); successDelete();}} 
                    loading={this.state.buttonDeleteLoading}
                  >
                    Delete
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const ContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "70%",
  margin: "auto",
};

const columnStyle: CSSProperties = {
  marginTop: "10rem",
  paddingBottom: "8rem",
};

export default withRouter(AdminEditDetails);

async function saveDeleteProductMockApi() {
  return new Promise((res) => setTimeout(() => res("success"), 2000));
}