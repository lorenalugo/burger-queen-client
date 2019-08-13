import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorMessage from '../ErrorMessage/index';

afterEach(cleanup);

test('renders an incoming message', () => {
  const text = 'this is an error message';
  const { getByText } = render(<ErrorMessage message={text} />);
  expect(getByText('this is an error message')).toBeInTheDocument();
});
