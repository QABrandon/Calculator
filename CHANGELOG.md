# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2024-02-14

### Added
- Heat Index calculator for weather-related calculations
  - Calculate "feels like" temperature based on actual temperature and humidity
  - Uses Rothfusz regression formula for accurate results
  - Input fields for temperature (°F) and relative humidity (%)
  - Displays calculation result with descriptive equation

## [1.1.0] - 2024-02-13

### Added
- Quick calculation buttons for common calculations
- Tip calculator with bill amount and percentage
- Simple interest calculator with principal, rate, and time
- BMI calculator with weight and height
- Modal dialogs for each quick calculation
- Input validation for all quick calculations
- Formatted results with appropriate decimal places
- Equation display showing calculation steps

## [1.0.4] - 2024-02-13

### Fixed
- Fixed arithmetic operations not working properly
- Improved number input handling
- Added proper operator state tracking
- Fixed decimal point handling
- Added result formatting for better display
- Prevented invalid operations (empty equations, starting with operators)
- Added cleanup for trailing operators before calculation

## [1.0.3] - 2024-02-13

### Changed
- Replaced Material-UI Grid with CSS Grid for better TypeScript compatibility
- Simplified layout structure
- Improved button spacing and alignment

## [1.0.2] - 2024-02-13

### Changed
- Updated Material-UI and its peer dependencies to latest version
- Switched to Grid2 component for better TypeScript support

## [1.0.1] - 2024-02-13

### Fixed
- TypeScript type definitions for Material-UI Grid components
- Proper type imports for Grid components

## [1.0.0] - 2024-02-13

### Added
- Initial calculator implementation
- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Material-UI integration for modern design
- TypeScript support
- Decimal point functionality
- Clear button
- Error handling for invalid expressions
- Display showing both current input and full equation
- Responsive design for all screen sizes

### Technical Details
- Built with React 18 and TypeScript
- Uses Material-UI for components
- Uses mathjs for calculations
- State management with React hooks (useState)

## [2.0.0] - 2024-03-21

### Added
- Improved weather data accuracy using two-step API process (Geocoding + Weather)
- Real-time weather data verification for multiple cities
- Console logging for weather data debugging
- Support for specific US city formats (e.g., "Pensacola,FL,US")

### Fixed
- City names now correctly display in English
- Weather descriptions consistently show in English
- More accurate location data using coordinates

### Changed
- Updated Weather component to use OpenWeatherMap's Geocoding API
- Enhanced error handling for city searches
- Improved UI layout and responsiveness 

## [2.1.0] - 2024-03-21

### Changed
- Improved code quality in Weather component
- Added proper dependency management with useCallback
- Removed console.log statements
- Fixed TypeScript warnings and linting issues
- Cleaned up duplicate files from project structure

### Fixed
- Weather component useEffect dependencies
- Memory leaks in test cities interval
- TypeScript type definitions

## [2.0.0] - 2024-03-21

// ... existing changelog entries ... 