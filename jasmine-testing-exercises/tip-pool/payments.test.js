describe("Payments test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    allPayments = [ 
        {'billAmt' : 5,
        'tipAmt' : 10,
        'tipPercent' : calculateTipPercent(billAmt, tipAmt)},{
        'billAmt' : 10,
        'tipAmt' : 20,
        'tipPercent' : calculateTipPercent(billAmt, tipAmt)}
    ];
  });
    //submitPaymentInfo
  it('should clear the input boxes ', function () {
      expect(billAmtInput.value).toBe('');
      expect(tipAmtInput.value).toBe('');
  });
    //createCurPayment
  it('should return undefined with negative or empty inputs', function(){
      billAmtInput.value = '';
      tipAmtInput.value = -1;
      expect(createCurPayment()).toBe(undefined);
  });
    //appendPaymentTable
  it('appends to the Payment Table', function(){
      billAmtInput.value = 10;
      tipAmtInput.value = 15;
      appendPaymentTable(createCurPayment());
      //check to see if the table has the new value in it
      expect(paymentTbody.hasChildNodes()).toBeTruthy();

  });
    //updateSummary
  it('Updates the Summary Table', function(){
      updateSummary();
      expect(summaryTds[0].innerHTML).toBe("$15");
      expect(summaryTds[1].innerHTML).toBe("$30");
      //expect(summaryTds[2].innerHTML).toBe("200%");

  });

   
  afterEach(function() {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    allPayments = {};
    paymentID = 0;
    updateSummary();
    updateServerTable();
    let paymentTbody = document.querySelector('#paymentTable tbody');
    while (paymentTbody.firstChild){
        paymentTbody.removeChild(paymentTbody.firstChild);
    }
  });
});