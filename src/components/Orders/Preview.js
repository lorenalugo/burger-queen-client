/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProducSelected from './ProductSelected';

const Container = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px;
  color: #111;
`;

const Row = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  clear: both;
`;
const Col = styled.div`
  box-sizing: border-box;
  width: 33.333%;
  padding: 5px;
  float: left;
  text-align: left;
  font-size: 18px;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  clear: both;
`;
const Button = styled.button`
  width: 50%;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 700;
`;
const GreenButton = styled(Button)`
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
`;

const RedButton = styled(Button)`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
`;

const Total = styled.div`
  font-size: 30px;
  margin: 5px 0;
  p {
    float: left;
    margin:0;
  }
  h2 {
    float: right;
    margin:0;
  }
`;
const Preview = ({
  items,
  changeQty,
  changeSelection,
  DismissSelection,
  sendSelection,
  name,
}) => (
  <Container>
    <p>
      CLIENTE:
      {' '}
      {name.toUpperCase()}
    </p>
    <Total>
      <p>TOTAL:</p>
      {' '}
      <h2>
        S./
        { items.length > 0
          ? items.map(product => product.qty * product.price)
            .reduce((accum, current) => accum + current)
          : 0}
      </h2>
    </Total>
    <Row>
      <Col>PRODUCTO</Col>
      <Col>CANTIDAD</Col>
      <Col>SUBTOTAL</Col>
    </Row>
    { items.map(product => (
      <Row key={product._id}>
        <ProducSelected
          item={product}
          qty={product.qty}
          onChangeQty={changeQty}
          onChangeSelection={changeSelection}
        />
      </Row>
    ))}
    <FlexContainer>
      <RedButton type="button" onClick={() => DismissSelection(name, items)}>ANULAR</RedButton>
      <GreenButton type="button" onClick={() => sendSelection(name, items)}>ENVIAR</GreenButton>
    </FlexContainer>
  </Container>
);

Preview.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeQty: PropTypes.func.isRequired,
  changeSelection: PropTypes.func.isRequired,
  sendSelection: PropTypes.func.isRequired,
  DismissSelection: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Preview;
