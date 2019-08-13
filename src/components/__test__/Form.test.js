import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../Login/Form';

afterEach(cleanup);

test('calls onSubmit with email and password', (done) => {
  const token = 'wtw45CmyEuh4P621IDVxWkgVr5QwTg3wXEc4Z7Cv';
  const handleSubmit = jest.fn(() => new Promise((resolve) => {
    const response = {
      status: 200,
      json: jest.fn(() => (Promise.resolve({ token }))),
    };
    resolve(response);
  }));
  const handleError = jest.fn(x => x);

  const { getByLabelText, getByText } = render(
    <Form onSubmit={handleSubmit} onChange={handleError} />,
  );
  getByLabelText(/email/i).value = 'test@localhost';
  getByLabelText(/password/i).value = 'xxxxx';
  fireEvent.click(getByText(/submit/i));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@localhost',
    password: 'xxxxx',
  });

  setTimeout(
    () => {
      expect(localStorage.setItem).toHaveBeenLastCalledWith('token', token);
      done();
    },
    0,
  );

});
