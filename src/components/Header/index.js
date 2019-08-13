import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  background-color: #000;
  height: 50px;
`;
const Brand = styled.h4`
  margin: 0;
  padding: 15px;
  float: left;
`;
const NavigationButton = styled.div`
  float: right;
  padding: 15px;
  a {
    margin-right: 30px;
    color: #fff;
    text-decoration: none;
  }
`;
const Header = () => (
  <Container>
    <nav>
      <Brand>Burger Queen</Brand>
      <NavigationButton>
        <Link to="/orders">Hacer Pedidos</Link>
        <Link to="/kitchen">Consultar Pedidos</Link>
      </NavigationButton>
    </nav>
  </Container>
);

export default Header;
