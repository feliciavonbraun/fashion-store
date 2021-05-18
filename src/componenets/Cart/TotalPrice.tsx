import { Col, Row, Button } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { CartContext } from '../../contexts/CartContext';
interface Props {
    next(): void;
}
class TotalPrice extends Component<Props> {
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;

    render() {
        const { getTotalPrice } = this.context;
        return(
            <Row style={totalPriceContainer}>
                <Col span={24}>
                    <h2>Total price: 
                        <span style={priceStyle}>{getTotalPrice() + ' kr '}</span>
                    </h2>
                    <p>including delivery and VAT</p>
                    <Button type="primary" onClick={this.props.next}>
                        Next
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default TotalPrice;

const totalPriceContainer: CSSProperties = {
    padding: '4rem'
}

const priceStyle: CSSProperties = {
    fontWeight: 'bold',
    color: 'red'
}