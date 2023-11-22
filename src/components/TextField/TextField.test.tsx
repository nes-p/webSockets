import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TextField from './index';

describe('TextField', () => {
  const callMock = jest.fn();
  const clearMock = jest.fn();
  const TEST_NAME = 'TEST_NAME';

  it('should display label', () => {
    render(<TextField textLabel={TEST_NAME} clear={clearMock} />);
    const name = screen.getByText(/TEST_NAME/i);
    expect(name).toBeInTheDocument();
  });

  it('should call callback', () => {
    render(
      <TextField textLabel={TEST_NAME} onChange={callMock} clear={clearMock} />,
    );
    const input = screen.getByLabelText(TEST_NAME);
    act(() => {
      fireEvent.change(input, { target: { value: '123' } });
    });
    expect(callMock).toHaveBeenCalledTimes(1);
  });

  it('should have placeholder', () => {
    const PLACEHOLDER = 'TEST_PLACEHOLDER';
    render(
      <TextField
        placeholder={PLACEHOLDER}
        onChange={callMock}
        clear={clearMock}
      />,
    );
    const text = screen.getByPlaceholderText(/TEST_PLACEHOLDER/i);
    expect(text).toBeInTheDocument();
  });

  it('should display value', () => {
    const TEST_INPUT = '123';
    render(
      <TextField
        value={TEST_INPUT}
        textLabel={TEST_NAME}
        onChange={callMock}
        clear={clearMock}
      />,
    );
    const input = screen.getByLabelText(TEST_NAME);
    expect(input).toHaveDisplayValue('123');
  });

  it('should display error', () => {
    const TEST_ERROR_TEXT = 'TEST_ERROR_TEXT';
    render(
      <TextField
        isValid={false}
        validationMessage={TEST_ERROR_TEXT}
        textLabel={TEST_NAME}
        clear={clearMock}
      />,
    );
    const error = screen.getByText(/TEST_ERROR_TEXT/i);
    expect(error).toBeInTheDocument();
  });
});
