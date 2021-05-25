import { Button, Radio, Row } from 'antd';
import { Component, CSSProperties, useContext, useState } from 'react';
import {CartContext} from '../../contexts/CartContext';
import { DeliveryMethods, DeliveryContext} from '../../contexts/DeliveryContext';

interface Props {
  next(): void;  
}

interface State {
  setDeliveryMethod: DeliveryMethods[],
  value: number,
}


function DeliverySelection(props: Props) {
  const deliveryContext = useContext(DeliveryContext)
  const {allDeliveryMethods, calculateDeliveryDay} = deliveryContext;
  const cartContext = useContext(CartContext)
  const {setDeliveryMethod} = cartContext;
  
  const handleChange = (e: any) => {
    const method = e.target.value;
    setDeliveryMethod(method);
  };


  const mapMethodToRadio = () => {
    return allDeliveryMethods.map(item =>
      <Radio value={item} style={{ marginTop: '2rem' }}>
        <span style={deliveryCompanyStyle}>{item.company}</span>
        <br/>
        <span style={deliveryTextStyle}>{'Delivery on ' + calculateDeliveryDay(item.time)}</span>
        <br/>
        <span style={deliveryTextStyle}>{item.price + ' kr '}</span>
      </Radio>
    );
  }


    return (
      <Row style={deliveryContainer}>
          <h2>
              Delivery
          </h2>
          <Radio.Group onChange={handleChange}>
            {mapMethodToRadio()}
          </Radio.Group>
          <br/>
          <Button type="primary" style={buttonStyle} onClick={props.next}>
            Next
          </Button>
      </Row>

          )
}

export default DeliverySelection;

const deliveryContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  margin: 'auto',
  paddingTop: '3rem',
  paddingBottom: '3rem'
}

const buttonStyle: CSSProperties = {
  marginTop: '3rem',
  width: '4rem'
}

const deliveryTextStyle: CSSProperties = {
  marginTop: '1rem',
  marginRight: '4rem',
  color: '#666666',
}

const deliveryCompanyStyle: CSSProperties = {
  fontWeight: 'bold',
}

function setDeliveryMethods(method: DeliveryMethods) {
  throw new Error('Function not implemented.');
}
