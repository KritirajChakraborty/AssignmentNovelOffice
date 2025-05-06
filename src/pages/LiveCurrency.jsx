import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import CurrencySelector from "../components/CurrencySelector";
import useFetchData from "../hooks/useFetch";
import ErrorBoundary from "../components/ErrorBoundary";
import { useAppContext } from "../context/AppContext";

const LiveCurrency = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentCurrency, setCurrentCurrency } = useAppContext();
  const { rates, error, isLoading } = useFetchData(currentCurrency);

  if (error) {
    return (
      <ErrorBoundary
        error={{
          title: "Exchange Rate Error",
          message: "Failed to load currency data",
          details: error.message,
        }}
      />
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCurrencies = Object.entries(rates).filter(([currency]) =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCurrencies = filteredCurrencies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          maxWidth: 320,
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          Select Currency
        </Typography>
        <CurrencySelector
          rates={rates}
          selectedCurrency={currentCurrency}
          onChange={(e) => setCurrentCurrency(e.target.value)}
        />
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rounded" width={"100%"} height={500} />
        </Box>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Exchange Rates (Base: INR)
          </Typography>

          <TextField
            label="Search Currency"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Currency</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedCurrencies.map(([currency, rate]) => (
                  <TableRow key={currency}>
                    <TableCell>{currency.toUpperCase()}</TableCell>
                    <TableCell align="right">{rate.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCurrencies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};

export default LiveCurrency;
