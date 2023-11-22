import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
  const TEST_HEADER = 'TEST_HEADER';

  it('should display text', () => {
    render(<Header title={TEST_HEADER} />);
    const text = screen.getByText(TEST_HEADER);
    expect(text).toBeInTheDocument();
  });
});
