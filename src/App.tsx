import React, { useState } from 'react';
import { Box, Container, Paper, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from '@mui/material';
import { evaluate } from 'mathjs';
import './App.css';
import Weather from './components/Weather';

interface QuickCalcDialog {
  open: boolean;
  type: 'tip' | 'interest' | 'bmi' | 'heat-index' | null;
}

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [lastWasOperator, setLastWasOperator] = useState<boolean>(false);
  const [dialog, setDialog] = useState<QuickCalcDialog>({ open: false, type: null });
  const [quickCalcInputs, setQuickCalcInputs] = useState<{[key: string]: string}>({
    amount: '',
    percentage: '',
    principal: '',
    rate: '',
    time: '',
    weight: '',
    height: '',
    temperature: '',
    humidity: ''
  });

  const handleNumber = (num: string) => {
    if (hasResult) {
      // If we just got a result, start a new equation
      setDisplay(num);
      setEquation(num);
      setHasResult(false);
    } else {
      // Normal number input
      const newDisplay = display === '0' ? num : display + num;
      setDisplay(newDisplay);
      if (lastWasOperator) {
        setDisplay(num);
      }
      setEquation(equation + num);
    }
    setLastWasOperator(false);
  };

  const handleOperator = (operator: string) => {
    if (equation === '') return; // Prevent starting with operator
    
    setHasResult(false);
    setLastWasOperator(true);
    
    // Replace last operator if there was one
    if (equation.slice(-1).match(/[+\-*/]/)) {
      setEquation(equation.slice(0, -1) + operator);
    } else {
      setEquation(equation + operator);
    }
  };

  const handleEquals = () => {
    if (equation === '') return; // Prevent empty evaluation
    
    // Remove trailing operator if exists
    const cleanEquation = equation.replace(/[+\-*/]$/, '');
    
    try {
      const result = evaluate(cleanEquation);
      const formattedResult = Number.isInteger(result) ? 
        result.toString() : 
        Number(result.toFixed(8)).toString();
      
      setDisplay(formattedResult);
      setEquation(formattedResult);
      setHasResult(true);
      setLastWasOperator(false);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setHasResult(true);
      setLastWasOperator(false);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
    setLastWasOperator(false);
  };

  const handleDecimal = () => {
    if (hasResult) {
      setDisplay('0.');
      setEquation('0.');
      setHasResult(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
      setEquation(equation + '.');
    }
    setLastWasOperator(false);
  };

  const handleQuickCalcOpen = (type: 'tip' | 'interest' | 'bmi' | 'heat-index') => {
    setDialog({ open: true, type });
  };

  const handleQuickCalcClose = () => {
    setDialog({ open: false, type: null });
    setQuickCalcInputs({
      amount: '',
      percentage: '',
      principal: '',
      rate: '',
      time: '',
      weight: '',
      height: '',
      temperature: '',
      humidity: ''
    });
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuickCalcInputs({
      ...quickCalcInputs,
      [field]: event.target.value
    });
  };

  const calculateTip = () => {
    const amount = parseFloat(quickCalcInputs.amount);
    const percentage = parseFloat(quickCalcInputs.percentage);
    if (isNaN(amount) || isNaN(percentage)) return;

    const tip = amount * (percentage / 100);
    const total = amount + tip;
    setDisplay(total.toFixed(2));
    setEquation(`${amount} + (${amount} × ${percentage}%)`);
    handleQuickCalcClose();
  };

  const calculateInterest = () => {
    const principal = parseFloat(quickCalcInputs.principal);
    const rate = parseFloat(quickCalcInputs.rate);
    const time = parseFloat(quickCalcInputs.time);
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) return;

    const interest = principal * (rate / 100) * time;
    const total = principal + interest;
    setDisplay(total.toFixed(2));
    setEquation(`${principal} × (1 + ${rate}% × ${time})`);
    handleQuickCalcClose();
  };

  const calculateBMI = () => {
    const weight = parseFloat(quickCalcInputs.weight);
    const height = parseFloat(quickCalcInputs.height);
    if (isNaN(weight) || isNaN(height)) return;

    const bmi = weight / ((height / 100) * (height / 100));
    setDisplay(bmi.toFixed(1));
    setEquation(`${weight} ÷ (${height}/100)²`);
    handleQuickCalcClose();
  };

  const calculateHeatIndex = () => {
    const temperature = parseFloat(quickCalcInputs.temperature);
    const humidity = parseFloat(quickCalcInputs.humidity);
    if (isNaN(temperature) || isNaN(humidity)) return;

    // Heat Index formula (Rothfusz regression)
    const t = temperature;
    const r = humidity;
    const heatIndex = -42.379 +
                     (2.04901523 * t) +
                     (10.14333127 * r) +
                     (-0.22475541 * t * r) +
                     (-0.00683783 * t * t) +
                     (-0.05481717 * r * r) +
                     (0.00122874 * t * t * r) +
                     (0.00085282 * t * r * r) +
                     (-0.00000199 * t * t * r * r);
    
    setDisplay(heatIndex.toFixed(1));
    setEquation(`Heat Index for ${t}°F at ${r}% humidity`);
    handleQuickCalcClose();
  };

  const renderDialogContent = () => {
    switch (dialog.type) {
      case 'tip':
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Bill Amount"
              type="number"
              fullWidth
              value={quickCalcInputs.amount}
              onChange={handleInputChange('amount')}
            />
            <TextField
              margin="dense"
              label="Tip Percentage"
              type="number"
              fullWidth
              value={quickCalcInputs.percentage}
              onChange={handleInputChange('percentage')}
            />
          </>
        );
      case 'interest':
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Principal Amount"
              type="number"
              fullWidth
              value={quickCalcInputs.principal}
              onChange={handleInputChange('principal')}
            />
            <TextField
              margin="dense"
              label="Interest Rate (%)"
              type="number"
              fullWidth
              value={quickCalcInputs.rate}
              onChange={handleInputChange('rate')}
            />
            <TextField
              margin="dense"
              label="Time (years)"
              type="number"
              fullWidth
              value={quickCalcInputs.time}
              onChange={handleInputChange('time')}
            />
          </>
        );
      case 'bmi':
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Weight (kg)"
              type="number"
              fullWidth
              value={quickCalcInputs.weight}
              onChange={handleInputChange('weight')}
            />
            <TextField
              margin="dense"
              label="Height (cm)"
              type="number"
              fullWidth
              value={quickCalcInputs.height}
              onChange={handleInputChange('height')}
            />
          </>
        );
      case 'heat-index':
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Temperature (°F)"
              type="number"
              fullWidth
              value={quickCalcInputs.temperature}
              onChange={handleInputChange('temperature')}
            />
            <TextField
              margin="dense"
              label="Relative Humidity (%)"
              type="number"
              fullWidth
              value={quickCalcInputs.humidity}
              onChange={handleInputChange('humidity')}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Calculates how hot it feels based on temperature and humidity.
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  const handleDialogCalculate = () => {
    switch (dialog.type) {
      case 'tip':
        calculateTip();
        break;
      case 'interest':
        calculateInterest();
        break;
      case 'bmi':
        calculateBMI();
        break;
      case 'heat-index':
        calculateHeatIndex();
        break;
    }
  };

  const buttons = [
    { text: '7', handler: () => handleNumber('7') },
    { text: '8', handler: () => handleNumber('8') },
    { text: '9', handler: () => handleNumber('9') },
    { text: '÷', handler: () => handleOperator('/') },
    { text: '4', handler: () => handleNumber('4') },
    { text: '5', handler: () => handleNumber('5') },
    { text: '6', handler: () => handleNumber('6') },
    { text: '×', handler: () => handleOperator('*') },
    { text: '1', handler: () => handleNumber('1') },
    { text: '2', handler: () => handleNumber('2') },
    { text: '3', handler: () => handleNumber('3') },
    { text: '-', handler: () => handleOperator('-') },
    { text: '0', handler: () => handleNumber('0') },
    { text: '.', handler: handleDecimal },
    { text: '=', handler: handleEquals },
    { text: '+', handler: () => handleOperator('+') },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: { xs: '1', md: '2' } }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2
            }}
          >
            <Box 
              sx={{ 
                mb: 2, 
                p: 2, 
                backgroundColor: 'white',
                borderRadius: 1,
                minHeight: '60px'
              }}
            >
              <Typography variant="h4" align="right" sx={{ wordBreak: 'break-all' }}>
                {display}
              </Typography>
              <Typography variant="caption" align="right" display="block" color="text.secondary">
                {equation}
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={handleClear}
                sx={{ 
                  mb: 1,
                  backgroundColor: '#ff9800',
                  '&:hover': {
                    backgroundColor: '#f57c00'
                  }
                }}
              >
                Clear
              </Button>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 1,
                  mb: 2
                }}
              >
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    fullWidth
                    variant="contained"
                    onClick={button.handler}
                    sx={{
                      backgroundColor: button.text === '=' ? '#4caf50' : '#2196f3',
                      '&:hover': {
                        backgroundColor: button.text === '=' ? '#43a047' : '#1976d2'
                      }
                    }}
                  >
                    {button.text}
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleQuickCalcOpen('tip')}
                  sx={{ backgroundColor: '#9c27b0', '&:hover': { backgroundColor: '#7b1fa2' } }}
                >
                  Tip
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleQuickCalcOpen('interest')}
                  sx={{ backgroundColor: '#9c27b0', '&:hover': { backgroundColor: '#7b1fa2' } }}
                >
                  Interest
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleQuickCalcOpen('bmi')}
                  sx={{ backgroundColor: '#9c27b0', '&:hover': { backgroundColor: '#7b1fa2' } }}
                >
                  BMI
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleQuickCalcOpen('heat-index')}
                  sx={{ backgroundColor: '#9c27b0', '&:hover': { backgroundColor: '#7b1fa2' } }}
                >
                  Heat Index
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Weather />
        </Box>
      </Stack>

      <Dialog open={dialog.open} onClose={handleQuickCalcClose}>
        <DialogTitle>
          {dialog.type === 'tip' && 'Calculate Tip'}
          {dialog.type === 'interest' && 'Calculate Simple Interest'}
          {dialog.type === 'bmi' && 'Calculate BMI'}
          {dialog.type === 'heat-index' && 'Calculate Heat Index'}
        </DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQuickCalcClose}>Cancel</Button>
          <Button onClick={handleDialogCalculate} variant="contained">
            Calculate
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
