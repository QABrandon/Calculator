import React, { useState, useEffect, useCallback } from 'react';
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

  const fetchWeather = useCallback(async (searchCity: string) => {
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
      
      if (geoData.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = geoData[0];

      // Then get weather data using coordinates
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial&lang=en`
      );

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      setWeather({
        main: {
          temp: weatherData.main.temp,
          humidity: weatherData.main.humidity
        },
        weather: [{
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon
        }],
        name: geoData[0].local_names?.en || geoData[0].name
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch weather for San Francisco by default
    fetchWeather('San Francisco');
  }, [fetchWeather]);

  // Add test cities effect
  useEffect(() => {
    const testCities = ['Pensacola,FL,US', 'Pittsburgh,PA,US'];
    let currentIndex = 0;

    const testNextCity = () => {
      if (currentIndex < testCities.length) {
        fetchWeather(testCities[currentIndex]);
        currentIndex++;
      }
    };

    testNextCity();
    const interval = setInterval(testNextCity, 2000);

    return () => clearInterval(interval);
  }, [fetchWeather]); // Add fetchWeather as a dependency

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