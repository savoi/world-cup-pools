import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card'
import Flag from 'react-world-flags'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { CardContent } from '@mui/material';

const steps = [
  {
    label: 'Round of 16'
  },
  {
    label: 'Quarter-finals'
  },
  {
    label: 'Semi-finals'
  },
  {
    label: 'Final'
  },
  {
    label: 'Champion'
  },
];

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Flag code="NLD" width="30" />
                <Typography>Netherlands</Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography align="right">3</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Flag code="USA" width="30" />
                <Typography>USA</Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography align="right">1</Typography>
                </Box>
              </Stack>
            </Stack>
            </CardContent>
        </Card>
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}