import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Card from './index';
import ContentContainer from './ContentContainer';
import CardContent from './CardContent';

describe('Card', () => {
  const callMock = jest.fn();
  const TEST_STOCKID = 'NA000K0VF054';

  it('should display card header', () => {
    render(
      <Card stockId={TEST_STOCKID} unsubscribe={callMock}>
        <></>
      </Card>,
    );
    const id = screen.getByTestId('isin-test');
    expect(id).toBeInTheDocument();
  });

  it('should call callback', () => {
    render(
      <Card stockId={TEST_STOCKID} unsubscribe={callMock}>
        <></>
      </Card>,
    );
    const input = screen.getByTestId('close-icon');
    act(() => {
      fireEvent.click(input);
    });
    expect(callMock).toHaveBeenCalled();
  });

  it('should display content', () => {
    const TEST_CONTENT = 'test_content';
    render(
      <Card stockId={TEST_STOCKID} unsubscribe={callMock}>
        <ContentContainer>
          <CardContent>
            <span> {TEST_CONTENT}</span>
          </CardContent>
        </ContentContainer>
      </Card>,
    );
    const input = screen.getByText(TEST_CONTENT);
    expect(input).toBeInTheDocument();
  });
});
