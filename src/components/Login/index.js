import React, { useState } from 'react';
import styled from 'styled-components';
import Form from './Form';
import ErrorMessage from '../ErrorMessage/index';
import handleSubmit from '../../controllers/handleSubmit';
import logo from '../../assets/hamburger.png';

const Container = styled.div`
  width: 70%;
  margin: 40px auto;
  box-sizing: border-box;
  text-align: center;
  background-color: #161616;
  border: 1px solid #fff;
  padding: 40px;
`;
const Image = styled.img`
  width: 30%;
  heigth: auto;
  box-sizing: border-box;
`;
const Title = styled.h2`
  margin-bottom: 0;
`;
const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleError = err => setErrorMessage(err);
  return (
    <Container>
      <Image src={logo} alt="hamburger logo" />
      <Title>INICIO DE SESIÓN</Title>
      <Form onSubmit={handleSubmit} onChange={handleError} />
      <ErrorMessage message={errorMessage} />
    </Container>
  );
};

export default Login;
