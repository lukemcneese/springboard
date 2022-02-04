
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}
function appendDeleteBtn(tr){
  //create a TD with value X
  let newTD = document.createElement('td');
  newTD.innerText = "X";
  newTD.setAttribute('id','x');
  newTD.addEventListener("click",deleteRow);
  tr.append(newTD);

}
function deleteRow(event){
  let childNode = event.target;
  /* 
  really should update the arrays and the screens to reflect the information being removed I would imagine this is outside the scope of this exercise
  let row = childNode.parentNode;

  //if its a server remove it from the all servers
  for(servers of allServers){

  }
  updateServerTable();
  //if its a payment remove it from all payments and update Summary
  for(payments of allPayments){

  }
  updateSummary();
  */
  childNode.parentNode.remove();
}
