import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Notification from './index';

describe('Notification', () => {
  const TEST_NOTIFICATION = 'TEST_NOTIFICATION';

  it('should display text', () => {
    render(<Notification>{TEST_NOTIFICATION}</Notification>);
    const text = screen.getByText(TEST_NOTIFICATION);
    expect(text).toBeInTheDocument();
  });
});
