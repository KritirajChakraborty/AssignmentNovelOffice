import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CurrencySelector from "./CurrencySelector";
import { useAppContext } from "../context/AppContext";
import useFetchData from "../hooks/useFetch";

const EMITable = ({ schedule, emi }) => {
  const { currentCurrency, setCurrentCurrency, showTable, setShowTable } =
    useAppContext();
  const { rates } = useFetchData(currentCurrency);

  const handleReset = () => {
    setShowTable(false);
  };

  if (!showTable) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6">
        Monthly EMI:{" "}
        <strong>
          {emi.toFixed(2)} {currentCurrency}
        </strong>
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <CurrencySelector
          rates={rates}
          selectedCurrency={currentCurrency}
          onChange={(e) => setCurrentCurrency(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            ml: 2,
            color: "purple",
            backgroundColor: "white",
            borderColor: "purple",
          }}
        >
          RESET TABLE
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Amortization Schedule ({currentCurrency})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Month</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Principal</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Interest</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Remaining Balance</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell align="right">
                  {row.principal.toFixed(2)} {currentCurrency}
                </TableCell>
                <TableCell align="right">
                  {row.interest.toFixed(2)} {currentCurrency}
                </TableCell>
                <TableCell align="right">
                  {row.remainingBalance.toFixed(2)} {currentCurrency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EMITable;
