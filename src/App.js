import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import history from './controllers/history';
import Login from './components/Login/index';
import Kitchen from './components/Kitchen/index';
import Orders from './components/Orders/index';
import PrivateRoute from './components/PrivateRoute/index';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
`;

const App = () => (
  <Container>
    <Router history={history}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
        <PrivateRoute exact path="/orders" component={Orders} />
        <PrivateRoute exact path="/kitchen" component={Kitchen} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </Router>
  </Container>
);

export default App;
