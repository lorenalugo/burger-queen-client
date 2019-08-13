import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../Orders/Button';

afterEach(cleanup);

test('calls handleClick', () => {
  const fakeList = [
    {
      name: 'cafe',
      price: 5,
      type: 'desayuno',
    },
    {
      name: 'hamburguesa simple',
      price: 6,
      type: 'almuerzo y cena',
    },
    {
      name: 'sandwich',
      price: 5,
      type: 'desayuno',
    },
  ];
  const handleChange = jest.fn(x => x);
  const { getByText } = render(
    <Button name="desayuno" items={fakeList} onChange={handleChange} />,
  );
  fireEvent.click(getByText('desayuno'));

  expect(handleChange).toHaveBeenCalledTimes(1);
});
