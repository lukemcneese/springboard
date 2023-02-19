// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
    function toDigits(number){
        let digitString = number.toString().split('');
        return digitString.map(Number)
    }
    num1Digits = toDigits(num1);
    num2Digits = toDigits(num2);

    let num1Freq = {};
    let num2Freq = {};

    for(let char of num1Digits){
        num1Freq[char] = ++num1Freq[char] || 1;
    }

    for(let char of num2Digits){
        num2Freq[char] = ++num2Freq[char] || 1;
    }
    
    for (let char in num2Freq){
        if(!num1Freq[char]) return false;
        if(num2Freq[char] !== num1Freq[char]) return false;
    }
    return true;
}
