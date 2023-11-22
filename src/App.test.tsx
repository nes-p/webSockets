import { act, fireEvent, render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('submit number and render watch list', async () => {
    const stockId = 'US0004026250';
    render(<App />);
    const input = screen.getByRole('textbox');
    //wait to open connection
    await new Promise((r) => setTimeout(r, 2000));
    act(() => {
      fireEvent.change(input, { target: { value: stockId } });
    });
    const submit = screen.getByTestId('btn-test-id');

    act(() => {
      fireEvent.click(submit);
    });
    const card = await screen.findByTestId('card-test-id');
    expect(card).toBeInTheDocument();
  });

  it('no card with invalid number', async () => {
    const stockId = '123';
    const validationMessage = 'Please insert valid stock number';
    render(<App />);
    const input = screen.getByRole('textbox');
    //wait to open connection
    await new Promise((r) => setTimeout(r, 2000));
    act(() => {
      fireEvent.change(input, { target: { value: stockId } });
    });
    const submit = screen.getByTestId('btn-test-id');

    act(() => {
      fireEvent.click(submit);
    });
    const card = screen.queryByTestId('card-test-id');
    const errorMessage = screen.queryByText(validationMessage);
    expect(errorMessage).toBeInTheDocument();
    expect(card).toBeNull();
  });
});

it('subscribe just once', async () => {
  const stockId = 'US0004026250';
  render(<App />);
  const input = screen.getByRole('textbox');
  //wait to open connection
  await new Promise((r) => setTimeout(r, 2000));
  act(() => {
    fireEvent.change(input, { target: { value: stockId } });
  });
  const submit = screen.getByTestId('btn-test-id');

  act(() => {
    fireEvent.click(submit);
  });
  act(() => {
    fireEvent.click(submit);
  });
  const cards = await screen.findAllByTestId('card-test-id');
  expect(cards.length).toBe(1);
});

it('unsubscribe', async () => {
  const stockId = 'US0004026250';
  render(<App />);
  const input = screen.getByRole('textbox');
  //wait to open connection
  await new Promise((r) => setTimeout(r, 1000));
  act(() => {
    fireEvent.change(input, { target: { value: stockId } });
  });
  const submit = screen.getByTestId('btn-test-id');

  act(() => {
    fireEvent.click(submit);
  });

  const removeButton = await screen.findByTestId('close-icon');
  act(() => {
    fireEvent.click(removeButton);
  });
  await new Promise((r) => setTimeout(r, 3000));
  const card = screen.queryByTestId('card-test-id');
  expect(card).toBeNull();
});
