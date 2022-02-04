describe("Helpers test (with setup and tear-down)", function() {
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
    tempTableRow = document.createElement('tr');
  });
    //sumPaymentTotal
  it('should total payments ', function () {
    expect(sumPaymentTotal('billAmt')).toEqual(15);
    expect(sumPaymentTotal('tipAmt')).toEqual(30);
  });
    //calculateTipPercent
  it('should covert the bill and tip ammount into a tip percent', function(){
      expect(calculateTipPercent(100,10)).toEqual(10);
  });
    //appendTd
  it('should append a table row element from a value', function(){
      appendTd(tempTableRow,5)
      expect(tempTableRow.hasChildNodes()).toBeTruthy();
  });
  //appendDelteBtn
  it('should add an X as TD in each TR that it is is passed', function(){
    appendDeleteBtn(tempTableRow)
    expect(tempTableRow.innerText).toEqual('X');
  });

   
  afterEach(function() {
    // teardown logic
    allPayments = {};
    tempTableRow = undefined;
  });
});