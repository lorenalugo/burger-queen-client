/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.div`
  box-sizing: border-box;
  width: 23%;
  min-height: 100px;
  font-size: 16px;
  margin: 5px 1% 5px 0;
  background-color: #fff;
  color: #000;
`;
const Row = styled.div`
  with: 100%;
  box-sizing: border-box;
  clear: both;
  padding: 0;
`;
const ColB = styled.div`
  width: 80%;
  box-sizing: border-box;
  float: left;
  line-height: 2;
  border-top: 1px solid #000;
`;
const ColS = styled.div`
  width: 20%;
  box-sizing: border-box;
  float: left;
  text-align: center;
  line-height: 2;
  border-top: 1px solid #000;
`;

const Select = styled.select`
  background-color: #4D88FF;
  border: none;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  width: 100%;
  margin: 0;
`;

const OrdersFiltered = ({ status, items, onClick }) => (
  <FlexContainer>
    {items.map(order => (
      <Item
        key={order._id.toString()}
        id={order._id}
        data-type={status}
      >
        <Row>
          <Select onChange={
            (e) => {
              const selected = e.target.value;
              onClick(order._id, selected);
            }}
          >
            <option value={order.status}>{order.status.toUpperCase()}</option>
            <option value="preparing">PREPARING</option>
            <option value="canceled">CANCELED</option>
            <option value="delivering">DELIVERING</option>
            <option value="delivered">DELIVERED</option>
          </Select>
        </Row>
        <Row>
          Cliente:
          {' '}
          {order.client.toUpperCase()}
        </Row>
        <Row>
          <ColS>CANT.</ColS>
          <ColB>PRODUCTO</ColB>
        </Row>
        {order.products.map(obj => (
          <Row>
            <ColS>{obj.qty}</ColS>
            <ColB>{obj.product.name}</ColB>
          </Row>
        ))}
      </Item>
    ))}
  </FlexContainer>
);

OrdersFiltered.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};


export default OrdersFiltered;
