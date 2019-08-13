/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Item = styled.li`
  box-sizing: border-box;
  width: 100px;
  text-align: center;
  font-size: 30px;
  margin: 10px 10px 0px 0px;
`;

const Button = styled.button`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  font-weight: 700;
  padding: 2px;
  color: #000;
  background-color: ${props => ((props['data-type'] === 'desayuno') ? '#4D88FF' : '#ff9a48')};
  border: 1px solid ${props => ((props['data-type'] === 'desayuno') ? '#b8daff' : '#c3e6cb')};
`;

const Products = ({ type, items, onClick }) => (
  <div>
    <Ul>
      {items.map(product => (
        <Item key={product._id.toString()}>
          <Button
            type="button"
            onClick={
              (e) => {
                const clicked = e.target.id;
                onClick(clicked);
              }}
            id={product._id}
            data-type={type}
          >
            {product.name}
            {' '}
            S./
            {product.price}
          </Button>
        </Item>
      ))}
    </Ul>
  </div>
);

Products.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};


export default Products;
