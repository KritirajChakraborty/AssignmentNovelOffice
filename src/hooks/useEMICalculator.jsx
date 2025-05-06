import { useMemo } from "react";

const useEMICalculator = (loanAmount, interestRate, termYears) => {
  return useMemo(() => {
    if (!loanAmount || !interestRate || !termYears) return [];

    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = termYears * 12;

    const emi = parseFloat(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );

    let balance = loanAmount;
    const schedule = [];

    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;

      schedule.push({
        month,
        principal: parseFloat(principal.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        remainingBalance: Math.abs(parseFloat(balance.toFixed(2))),
      });
    }

    return { schedule, emi };
  }, [loanAmount, interestRate, termYears]);
};

export default useEMICalculator;
