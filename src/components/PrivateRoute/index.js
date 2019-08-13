import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/index';
import { getToken } from '../../controllers/getControllers';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
`;
const Main = styled.div`
  width: 98%;
  margin: 50px auto;
`;
const PrivateRoute = ({ children, ...props }) => {
  if (getToken()) {
    return (
      <Container>
        <Header />
        <Main>
          <Route {...props}>
            {children}
          </Route>
        </Main>
      </Container>
    );
  }
  return (
    <Redirect to="/" />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

PrivateRoute.defaultProps = {
  children: null,
};

export default PrivateRoute;
