import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

interface GeocodingData {
  name: string;
  local_names: {
    en?: string;
  };
  lat: number;
  lon: number;
  country: string;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const fetchWeather = async (searchCity: string) => {
    setLoading(true);
    setError('');
    try {
      const API_KEY = '29bddaa467eebb00e47d61e2ba633f7b';
      
      // First, get coordinates using Geocoding API
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchCity.trim())}&limit=1&appid=${API_KEY}`
      );
      
      if (!geoResponse.ok) {
        throw new Error('City not found');
      }

      const geoData: GeocodingData[] = await geoResponse.json();
      
      if (!geoData.length) {
        throw new Error('City not found');
      }

      console.log(`Fetching weather for ${geoData[0].name} at coordinates: ${geoData[0].lat}, ${geoData[0].lon}`);

      // Use coordinates to get weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${API_KEY}&units=imperial&lang=en`
      );

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      console.log('Weather data received:', weatherData);
      setWeather(weatherData);
      setCity('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  // Test function to check both cities
  const testCities = async () => {
    console.log('Testing Pensacola, FL and Pittsburgh, PA...');
    await fetchWeather('Pensacola,FL,US');
    setTimeout(async () => {
      await fetchWeather('Pittsburgh,PA,US');
    }, 2000);
  };

  useEffect(() => {
    // Test both cities on component mount
    testCities();
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom>
        Weather
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name"
          size="small"
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      {weather && !loading && !error && (
        <Box>
          <Typography variant="h6">{weather.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              style={{ width: '100px', height: '100px' }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4">{Math.round(weather.main.temp)}°F</Typography>
              <Typography>{weather.weather[0].description}</Typography>
              <Typography>Humidity: {weather.main.humidity}%</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Weather; 