import * as React from 'react';
import { render } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Index from '../index';

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('Index (Login Screen)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { getAllByText, getByPlaceholderText } = await render(<Index />);

    expect(getAllByText("Log in")).toHaveLength(1);
    expect(getByPlaceholderText("Enter email")).toBeTruthy();
    expect(getByPlaceholderText("Enter password")).toBeTruthy();
  });
});
