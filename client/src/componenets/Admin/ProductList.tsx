import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, } from "antd";
import { Component, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Product, ProductContext } from "../../contexts/ProductContext"

interface State {
    allProducts: Product[]
}

class ProductList extends Component {
    static contextType = ProductContext;

    state: State = {
        allProducts: []
    }

    componentDidMount() {
        let getProduct = this.context;
        this.setState({allProducts: getProduct})
    }

    render() {
        console.log(this.state.allProducts)
        return (
            <Row style={containerStyle}>
                <Col style={columnStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems:'center', marginTop: '2rem', marginBottom: '3rem' }}>
                        <h1 style={{fontWeight: 'bold'}}>ADMIN</h1>                  
                        <Link to ={'/add-product'}> 
                            <Button type="primary" icon={<PlusOutlined />}>
                                Add product
                            </Button>
                        </Link> 
                    </div>    

                    <List grid={{
                        gutter: 12,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1,
                        }}
                        dataSource={this.state.allProducts}
                        renderItem={item => (
                            <List.Item>
                                <Link to={'/edit-product/' + item._id}>     
                                <List.Item.Meta                    
                                    avatar={<Avatar size={64} src={item.image} />} 
                                    title={<Link to={'/edit-product/' + item._id}>{item.name}</Link>}
                                    description={[item.description.split('.')[0],  
                                    ]}
                                />  
                                    <p style={editStyle}>edit</p>
                                </Link>   
                            </List.Item>
                        )}
                    /> 
                </Col>
            </Row> 
        )
    }
}

const containerStyle: CSSProperties ={
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '8rem',
}

const columnStyle: CSSProperties = {
   marginTop: '8rem',
   width: '80%'
}

const editStyle: CSSProperties = {
    color: 'red', 
    display: 'flex', 
    justifyContent: 'flex-end',
    borderBottom: '1px solid lightgrey',
    alignItems: 'center'
}

export default ProductList; 