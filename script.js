document.addEventListener("DOMContentLoaded", () => {
  const principalInput = document.getElementById("principal");
  const periodSelect = document.getElementById("period");
  const aprInput = document.getElementById("apr");
  const aprValue = document.getElementById("apr-value");
  const yearsInput = document.getElementById("years");
  const accumulatedOutput = document.getElementById("accumulated");
  const totalOutput = document.getElementById("total");

  function calculateInterest() {
    const principal = parseFloat(principalInput.value);
    const period = periodSelect.value;
    const apr = parseFloat(aprInput.value) / 100;
    const years = parseFloat(yearsInput.value);

    let timesCompounded;
    switch (period) {
      case "Yearly":
        timesCompounded = 1;
        break;
      case "Quarterly":
        timesCompounded = 4;
        break;
      case "Monthly":
        timesCompounded = 12;
        break;
      case "Daily":
        timesCompounded = 365;
        break;
      default:
        timesCompounded = 1;
        break;
    }

    if (principal > 0 && !isNaN(principal) && years > 0 && !isNaN(years)) {
      const accumulatedAmount =
        principal *
        Math.pow(1 + apr / timesCompounded, timesCompounded * years);
      const interestAmount = accumulatedAmount - principal;

      accumulatedOutput.textContent = `$${interestAmount.toFixed(2)}`;
      totalOutput.textContent = `$${accumulatedAmount.toFixed(2)}`;
    } else {
      accumulatedOutput.textContent = "$0.00";
      totalOutput.textContent = "$0.00";
    }
  }

  function updateAprValue() {
    const apr = parseFloat(aprInput.value);
    aprValue.textContent = `${apr}%`;
    calculateInterest();
  }

  principalInput.addEventListener("input", calculateInterest);
  periodSelect.addEventListener("change", calculateInterest);
  aprInput.addEventListener("input", updateAprValue);
  yearsInput.addEventListener("input", calculateInterest);

  updateAprValue();
});
