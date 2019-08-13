/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import styled from 'styled-components';
import Products from './Products';
import Preview from './Preview';
import { getToken, getUserId } from '../../controllers/getControllers';
import getItems from '../../controllers/getItems';

const addProductIfNotInArray = (products, selected, _id) => {
  const productSelected = products.find(p => p._id === _id);
  if (productSelected && !selected.find(element => element._id === productSelected._id)) {
    return [
      ...selected,
      {
        ...productSelected,
        qty: 1,
      },
    ];
  }
  return selected;
};
const updateQty = (id, newQty, list) => {
  const index = list.findIndex(item => item._id === id);
  const updatedList = list.map(item => Object.assign({}, item));
  updatedList[index].qty = newQty;
  return updatedList;
};
const eraseSelection = (id, list) => {
  const index = list.findIndex(item => item._id === id);
  const newList = list.map(item => Object.assign({}, item));
  newList.splice(index, 1);
  return newList;
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #161616;
`;
const Col = styled.div`
  box-sizing: border-box;
  width: 50%;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
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
  color: #000;
  background-color: ${props => ((props['data-type'] === 'desayuno') ? '#4D88FF' : '#ff9a48')};
  border: 1px solid ${props => ((props['data-type'] === 'desayuno') ? '#b8daff' : '#c3e6cb')};
`;

const Input = styled.input`
  display: block;
  width: 80%;
`;
const Orders = () => {
  const [productsList, setProductsList] = useState([]);
  const [selection, setSelection] = useState([]);
  const [menuType, setMenuType] = useState('desayuno');
  const [client, setClient] = useState('');

  const handleSelection = ((item) => {
    const newSelection = addProductIfNotInArray(productsList, selection, item);
    setSelection(newSelection);
  });
  const handleQty = (id, newQty) => {
    const newProductQty = updateQty(id, newQty, selection);
    setSelection(newProductQty);
  };
  const handleEraseSelection = (id) => {
    const newSelection = eraseSelection(id, selection);
    setSelection(newSelection);
  };
  const handleDismissSelection = () => {
    setSelection([]);
  };
  const handleSendOrder = async (name, list) => {
    const newOrder = {
      userId: getUserId(),
      client: name,
      products: list.map(p => ({ product: p._id, qty: p.qty })),
    };
    await getItems('orders', 'post', getToken(), newOrder);
    setClient('');
    setSelection([]);
  };
  const productsArray = async () => {
    const objArray = await getItems('products', 'get', getToken());
    setProductsList(objArray);
  };
  productsArray();
  return (
    <Container>
      <Col>
        <h2>Por favor ingrese el pedido:</h2>
        <Input
          type="text"
          placeholder="Ingrese el nombre del cliente"
          onChange={e => setClient(e.target.value)}
        />
        <FlexContainer>
          <Button type="button" data-type="desayuno" onClick={() => setMenuType('desayuno')}>DESAYUNO</Button>
          <Button type="button" data-type="Almuerzo y Cena" onClick={() => setMenuType('Almuerzo y Cena')}>ALMUERZO Y CENA</Button>
        </FlexContainer>
        <Products
          type={menuType}
          items={productsList.filter(p => p.type === menuType)}
          onClick={handleSelection}
        />
      </Col>
      <Col>
        {selection.length > 0
          ? (
            <Preview
              items={selection}
              changeQty={handleQty}
              changeSelection={handleEraseSelection}
              DismissSelection={handleDismissSelection}
              sendSelection={handleSendOrder}
              name={client}
            />
          ) : null}
      </Col>
    </Container>
  );
};

export default Orders;
