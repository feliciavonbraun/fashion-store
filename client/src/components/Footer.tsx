import { Row, Col, Layout } from 'antd';
import { CSSProperties } from 'react';

function Footer() {
    const { Footer } = Layout;
    return (
        <Row style={footerStyle}>
            <Col span={24}>
                <Footer style={{ background: 'black', height: '3rem', padding: '0.8rem 2rem' }}>
                    <h3 style={{ color: 'white' }}>FashionStore | 2021</h3>
                </Footer>
            </Col> 
        </Row>
    ); 
}

export default Footer; 

const footerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
}