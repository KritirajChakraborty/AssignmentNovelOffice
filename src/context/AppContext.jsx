import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [showTable, setShowTable] = useState(false);

  const [currentCurrency, setCurrentCurrency] = useState("INR");

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const [formData, setFormData] = useState({
    loanAmount: 100,
    interestRate: 10,
    termYears: 1,
  });

  const [formErrors, setFormErrors] = useState({
    loanAmount: "",
    interestRate: "",
    termYears: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    let error = "";
    const numericValue = Number(value);

    if (!value) {
      error = "This field is required";
    } else if (numericValue <= 0) {
      error = "Value must be greater than 0";
    } else {
      if (field === "loanAmount" && numericValue > 100000000) {
        error = "Max loan is 10,00,00,000";
      }
      if (field === "interestRate" && numericValue > 100) {
        error = "Max interest is 100%";
      }
      if (field === "termYears" && numericValue > 30) {
        error = "Max term is 30 years";
      }
    }

    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? { background: { default: "#f5f5f5" } }
          : { background: { default: "#121212" } }),
      },
    });
  }, [mode]);

  return (
    <AppContext.Provider
      value={{
        mode,
        toggleMode,
        formData,
        formErrors,
        updateField,
        currentCurrency,
        setCurrentCurrency,
        showTable,
        setShowTable,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};
