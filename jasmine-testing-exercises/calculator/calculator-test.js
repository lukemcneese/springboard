
it('should calculate the monthly rate correctly', function () {
expect(Math.round(calculateMonthlyPayment({amount:100000, years: 30, rate: .05})*100)/100).toEqual(536.82);
expect(Math.round(calculateMonthlyPayment({amount:100000, years: 15, rate: .05})*100)/100).toEqual(790.79);
});

//https://stackoverflow.com/questions/69776105/how-can-you-use-jasmine-to-check-if-a-value-has-two-decimal-places
it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount:100000, years: 15, rate: .05}).toString()).toMatch(/^\d+\.\d\d$/);
});

/// etc


