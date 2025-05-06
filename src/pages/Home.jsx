import LoanCalculator from "../components/LoadCalculator";
import { useAppContext } from "../context/AppContext";
import useEMICalculator from "../hooks/useEMICalculator";
import EMITable from "../components/EMITable";
import { Paper } from "@mui/material";

const Home = () => {
  const { formData } = useAppContext();
  const { loanAmount, interestRate, termYears } = formData;

  const { schedule, emi } = useEMICalculator(
    loanAmount,
    interestRate,
    termYears
  );

  return (
    <Paper sx={{ px: 10, py: 2, minHeight: "90vh" }}>
      <LoanCalculator />
      <EMITable schedule={schedule} emi={emi} />
    </Paper>
  );
};

export default Home;
