import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as useLogout from 'api/common/useLogout';

import AppBar from './AppBar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockUser = { username: 'test' };

const mockGetTokens = jest
  .fn()
  .mockReturnValue({ refresh: { token: 'refresh-token' } });
const mockRemoveTokens = jest.fn();
jest.mock('utils/tokenService', () => ({
  getTokens: () => mockGetTokens(),
  removeTokens: () => mockRemoveTokens(),
  getDecodedToken: () => ({ ...mockUser }),
}));

const mockLogout = jest.fn();

describe('AppBar', () => {
  test('Should render component', () => {
    render(<AppBar />);

    const title = screen.getByText(`Hello, ${mockUser.username}`);
    expect(title).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent('Logout');
  });

  test('Should handle logout', () => {
    jest
      .spyOn(useLogout, 'default')
      .mockImplementation(() => [
        { data: {}, error: null, loading: false },
        mockLogout,
      ]);

    render(<AppBar />);

    const button = screen.getByText('Logout');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(mockGetTokens).toBeCalled();
    expect(mockRemoveTokens).toBeCalled();
    expect(mockNavigate).toBeCalled();
  });
});
