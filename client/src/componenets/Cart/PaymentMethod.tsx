import { Radio, Row } from 'antd';
import { Component, CSSProperties } from 'react';
import PayCard from './PayCard';
import PayKlarna from './PayKlarna';
import PaySwish from './PaySwish';

const RadioGroup = Radio.Group;

interface Props {
  next(): void;
}
class PaymentMethod extends Component<Props> {
  state = {
    value: 1,
  };

  onChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  creditCard (e: any) { }   
  swish (e: any) { }
  klarna (e: any) { }
      
  render() {
    const { value } = this.state;
    const paymentComponents: any = {
      1: PayCard,
      2: PaySwish,
      3: PayKlarna,
    };
    
    const PaymentComponent = paymentComponents[value];
    
    return(
      <Row style={paymentContainerStyle}>
        <h2>Payment</h2>
        <RadioGroup onChange={this.onChange} value={value}>
            <Radio onChange={this.creditCard} value={1}>Credit card</Radio>
            <Radio onChange={this.swish} value={2}>Swish</Radio>
            <Radio onChange={this.klarna} value={3}>Klarna</Radio>
        </RadioGroup>
        <div>
          <PaymentComponent
            next={this.props.next}/>
        </div> 
      </Row>
    )  
  }
}
 
export default PaymentMethod;

const paymentContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  margin: 'auto',
  paddingTop: '3rem',
  paddingBottom: '3rem'
}