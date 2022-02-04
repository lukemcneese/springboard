window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  //let values = getCurrentUIValues();
  document.getElementById("loan-amount").value = 100000;
  document.getElementById("loan-years").value = 30;
  document.getElementById("loan-rate").value = .05;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues();
  let payment = calculateMonthlyPayment(values);
  updateMonthly(payment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if(values.rate > 1){
    values.rate = values.rate/100;
 }

  let payment = (values.amount * (values.rate/12))/(1-(Math.pow((1 + values.rate/12),(-1*(values.years*12)))));
  payment = Math.round(payment*100)/100;
  return payment.toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPaymentSpan = document.getElementById("monthly-payment");
  monthlyPaymentSpan.innerText = "$"+monthly;
}