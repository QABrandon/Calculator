# React Calculator with Weather Widget

A modern calculator built with React, TypeScript, and Material-UI that combines standard arithmetic operations with quick calculation features and a real-time weather widget.

## Features

### Standard Calculator
- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Decimal number support
- Clear function
- Error handling for invalid expressions
- Real-time equation display
- Responsive design

### Quick Calculations
- **Tip Calculator**
  - Calculate total amount including tip
  - Customizable tip percentage
  - Shows calculation breakdown

- **Simple Interest Calculator**
  - Calculate total amount with interest
  - Input principal, rate, and time
  - Displays interest calculation formula

- **BMI Calculator**
  - Calculate Body Mass Index
  - Input weight (kg) and height (cm)
  - Shows BMI calculation formula

- **Heat Index Calculator**
  - Calculate "feels like" temperature
  - Based on temperature and humidity
  - Uses Rothfusz regression formula

### Weather Widget
- Real-time weather information
- Search by city name
- Displays:
  - Current temperature
  - Weather description
  - Humidity levels
  - Weather icon
- Powered by OpenWeatherMap API

## Technology Stack
- React 18
- TypeScript
- Material-UI
- mathjs (for calculations)
- OpenWeatherMap API (for weather data)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key

### Installation
1. Clone the repository
   ```bash
   git clone [repository-url]
   cd calculator
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Usage

### Basic Calculator
- Use the number pad for input
- Operators: +, -, ×, ÷
- Press = to calculate
- Press C to clear

### Quick Calculations
1. Click on the desired quick calculation button (Tip, Interest, BMI, or Heat Index)
2. Enter the required values in the modal
3. Click Calculate to see the result
4. The result and calculation formula will be displayed in the main calculator screen

### Weather Widget
1. Enter a city name in the search box
2. Press Enter or click Search
3. View current weather conditions for the specified location

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Version History
See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
