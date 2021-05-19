import {  Menu, Row } from "antd";
import React, { Component, CSSProperties } from "react";


class CategoryMenu extends Component {
    render() {
        
        return(
            <div>
                <Row style={categoryMenuContainer}>
                    <Menu mode="horizontal" style={MenuStyle}>
                      <Menu.Item >Skirts</Menu.Item>
                        <Menu.Item >Tops</Menu.Item>
                        <Menu.Item >Dresses</Menu.Item>
                        <Menu.Item >Trousers</Menu.Item>
                    </Menu>
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
    height: '1rem',
    margin: '0',
   
}

const MenuStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
}

// const linkStyle: CSSProperties = {
//    fontWeight: 400,
//    borderBottom: '0.1rem solid black'
// }