# Changelog

All notable changes to this project will be documented in this file.

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