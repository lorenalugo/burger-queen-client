/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from '../../controllers/history';
import { getToken } from '../../controllers/getControllers';
import getItems from '../../controllers/getItems';

const FormDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  font-size: 18px;
`;
const Label = styled.label`
  display: block;
  width: 100%;
`;
const Input = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 50px;
  margin: 10px auto;
  font-size: 18px;
`;

const Button = styled.button`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 50px;
  font-size: 14px;
  background-color: #e33e22;
  color: #fff;
  border: none;
  font-weight: 400;
  font-size: 18px;
  margin-top: 30px;
`;

const Form = ({ onSubmit, onChange }) => {
  const [emailState, setEmailState] = useState('');
  return (
    <FormDiv>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { email, password } = e.target.elements;
          onChange(null);
          onSubmit({
            email: email.value,
            password: password.value,
          })
            .then((response) => {
              if (response.status !== 200) {
                if (response.status === 404) {
                  throw new Error('User not found');
                } else {
                  throw new Error('Wrong password');
                }
              }
              return response.json();
            })
            .then((json) => {
              const { token } = json;
              localStorage.setItem('token', token);
              const getUser = async () => {
                const user = await getItems(`users/${emailState}`, 'get', getToken());
                return user;
              };
              getUser().then((user) => {
                localStorage.setItem('userId', user._id);
                if (user.roles.waiter) { return history.push('/orders'); }
                return history.push('/kitchen');
              });
            })
            .catch(err => onChange(err.message));
        }}
      >
        <Label htmlFor="email" className="Form-label">
          Email
        </Label>
        <Input id="email" className="Form-input" onChange={e => setEmailState(e.target.value)} />
        <Label htmlFor="password" className="Form-label">
          Password
        </Label>
        <Input type="password" id="password" className="Form-input" />
        <Button type="submit" className="Form-input Form-button">SUBMIT</Button>
      </form>
    </FormDiv>
  );
};
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default Form;
