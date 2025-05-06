import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListItemText,
} from "@mui/material";

const CurrencySelector = ({ rates, selectedCurrency, onChange }) => {
  return (
    <FormControl fullWidth sx={{ maxWidth: 120 }}>
      <InputLabel id="currency-select-label">Currency</InputLabel>
      <Select
        labelId="currency-select-label"
        value={selectedCurrency}
        label="Currency"
        onChange={onChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
      >
        {Object.entries(rates).map(([currencyCode, rate]) => (
          <MenuItem key={currencyCode} value={currencyCode}>
            <ListItemText primary={`${currencyCode.toUpperCase()}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
