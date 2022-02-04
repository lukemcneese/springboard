function calculateTaxes(income){
    if (!Number.isFinite(income)){
        throw new Error('BAD INCOME');
    }
    if (income > 30000){
        return income * 0.25;
    }
    else{
        return income * 0.15;
    }
}