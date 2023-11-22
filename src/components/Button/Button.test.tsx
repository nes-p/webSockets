import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  const callMock = jest.fn();
  const TEST_NAME = 'TEST_NAME';

  it('should display title', () => {
    render(<Button onClick={callMock}>{TEST_NAME}</Button>);
    const name = screen.getByText(TEST_NAME);
    expect(name).toBeInTheDocument();
  });

  it('should call callback', () => {
    render(<Button onClick={callMock}>{TEST_NAME}</Button>);
    const button = screen.getByText(TEST_NAME);
    act(() => {
      fireEvent.click(button);
    });
    expect(callMock).toHaveBeenCalled();
  });
});
