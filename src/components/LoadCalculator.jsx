import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const LoanCalculator = () => {
  const { formData, formErrors, updateField, setShowTable } = useAppContext();

  const handleCalculate = () => {
    const hasEmptyField = Object.values(formData).some((val) => val === "");
    const hasErrors = Object.values(formErrors).some((err) => err !== "");

    if (hasEmptyField || hasErrors) {
      alert("Please fix the errors before submitting.");
      return;
    }

    // Proceed with submit logic
    console.log("Form submitted!", formData);
    setShowTable(true);
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h4" fontWeight="semibold" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Grid container columns={12} spacing={2} justifyContent="left" mb={3}>
        <Grid xs={12} md={4}>
          <TextField
            label="Loan Amount"
            type="number"
            fullWidth
            value={formData.loanAmount}
            onChange={(e) => updateField("loanAmount", Number(e.target.value))}
            error={!!formErrors.loanAmount}
            helperText={formErrors.loanAmount}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            label="Interest Rate (%)"
            type="number"
            fullWidth
            value={formData.interestRate}
            onChange={(e) =>
              updateField("interestRate", Number(e.target.value))
            }
            error={!!formErrors.interestRate}
            helperText={formErrors.interestRate}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            label="Term (Years)"
            type="number"
            fullWidth
            value={formData.termYears}
            onChange={(e) => updateField("termYears", Number(e.target.value))}
            error={!!formErrors.termYears}
            helperText={formErrors.termYears}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        size="large"
        onClick={handleCalculate}
        sx={{ fontWeight: "semibold", px: 4 }}
      >
        CALCULATE
      </Button>
    </Box>
  );
};

export default LoanCalculator;
