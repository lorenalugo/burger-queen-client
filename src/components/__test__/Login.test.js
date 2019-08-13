import React from 'react';
import {
  render, cleanup, fireEvent, waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../Login/index';
import handleSubmit from '../../controllers/handleSubmit';


afterEach(cleanup);
jest.mock('../../controllers/handleSubmit');

test('renders error message', async () => {
  const { getByLabelText, getByText, getByTestId } = render(
    <Login />,
  );
  getByLabelText(/email/i).value = 'test@localhost';
  getByLabelText(/password/i).value = 'xxxxx';
  fireEvent.click(getByText(/submit/i));

  expect(handleSubmit).toHaveBeenCalled();

  const displayError = await waitForElement(() => getByTestId('message'));

  expect(displayError).toHaveTextContent('Wrong password');
});

/*  Warning: An update to Login inside a test was not wrapped in act(...).
*
When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  fire events that update state
});
  assert on the output
*/
