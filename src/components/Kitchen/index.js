/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import styled from 'styled-components';
import { getToken } from '../../controllers/getControllers';
import getItems from '../../controllers/getItems';
import OrdersFiltered from './OrdersFiltered';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #161616;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Button = styled.button`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
  font-weight: 700;
  font-size: 14px;
  color: #000;
  background-color: #ff9a48;
  border: 1px solid #b8daff;
  :focus {
    background-color: #4D88FF;
    color: #fff;
  }
`;

const Kitchen = () => {
  const [ordersList, setOrdersList] = useState([]);
  // const [selection, setSelection] = useState([]);
  const [status, setStatus] = useState('pending');
  const ordersArray = async () => {
    const objArray = await getItems('orders', 'get', getToken());
    setOrdersList(objArray);
  };
  const handleSelection = async (id, newStatus) => {
    await getItems(`orders/${id}`, 'put', getToken(), { status: newStatus });
    ordersArray();
  };
  ordersArray();
  return (
    <Container>
      <h2>Consulte el pedido:</h2>
      <FlexContainer>
        <Button type="button" data-type="pending" onClick={() => setStatus('pending')}>PENDING</Button>
        <Button type="button" data-type="delivering" onClick={() => setStatus('delivering')}>DELIVERING</Button>
        <Button type="button" data-type="delivered" onClick={() => setStatus('delivered')}>DELIVERED</Button>
        <Button type="button" data-type="canceled" onClick={() => setStatus('canceled')}>CANCELED</Button>
      </FlexContainer>
      <OrdersFiltered
        type={status}
        items={ordersList.filter(order => order.status === status)}
        onClick={handleSelection}
      />
    </Container>
  );
};


export default Kitchen;
