import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Weather from './Weather';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Weather Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    mockFetch.mockClear();
  });

  const mockWeatherData = {
    main: {
      temp: 72.5,
      humidity: 65
    },
    weather: [{
      description: 'partly cloudy',
      icon: '02d'
    }],
    name: 'San Francisco'
  };

  it('loads San Francisco weather by default', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData
    });

    render(<Weather />);

    // Check loading state
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for weather data to load
    await waitFor(() => {
      expect(screen.getByText('San Francisco')).toBeInTheDocument();
    });

    // Verify API call
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=San Francisco')
    );
  });

  it('searches for a new city when submitted', async () => {
    const newMockData = { ...mockWeatherData, name: 'London' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newMockData
    });

    render(<Weather />);

    // Enter new city
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'London' } });

    // Submit search
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    // Verify new city data appears
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    // Verify API call
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=London')
    );
  });

  it('handles API errors gracefully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    render(<Weather />);

    // Enter invalid city
    const input = screen.getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'NonExistentCity' } });

    // Submit search
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText('City not found')).toBeInTheDocument();
    });
  });

  it('displays weather details correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData
    });

    render(<Weather />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('73°F')).toBeInTheDocument();
      expect(screen.getByText('partly cloudy')).toBeInTheDocument();
      expect(screen.getByText('Humidity: 65%')).toBeInTheDocument();
      expect(screen.getByAltText('partly cloudy')).toHaveAttribute(
        'src',
        'http://openweathermap.org/img/wn/02d@2x.png'
      );
    });
  });
}); 