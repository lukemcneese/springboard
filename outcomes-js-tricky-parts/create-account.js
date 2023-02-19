function createAccount(pin, amount=0) {
    return{
        checkBalance(submittedPin){
            if(pin !== submittedPin) return "Invalid PIN";
            return amount;
        },
        deposit(submittedPin,depositAmount){
            if(pin !== submittedPin) return "Invalid PIN";
            amount += depositAmount;
            return `Deposit Successful your new balance is ${amount}`
        },
        withdraw(submittedPin,withdrawAmount){
            if(pin !== submittedPin) return "Invalid PIN";
            if(depositAmount > amount) return "Invalid Withdraw";
            amount = amount - depositAmount;
            return `Withdraw Successful your new balance is ${amount}`
        },
        changePin(submittedPin, newPin){
            if(pin !== submittedPin) return "Invalid PIN";
            pin = newPin;
            return "Pin Successfully Changed"
        }
    }

}

module.exports = { createAccount };
