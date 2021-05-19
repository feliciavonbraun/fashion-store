import { Button, Row } from "antd";
import React, { Component, CSSProperties } from "react";


class CategoryMenu extends Component {
    render() {
        
        return(
            <div>
                <Row style={categoryMenuContainer}>
                    <Button type="text">Skirts</Button>
                    <Button type="text">Tops</Button>
                    <Button type="text">Dresses</Button>
                    <Button type="text">Trousers</Button>
                </Row>
            </div>
        )
    }
}

export default CategoryMenu;

const categoryMenuContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 'auto',
   
}

const listStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
}

const linkStyle: CSSProperties = {
    listStyleType: 'none',
}