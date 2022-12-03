const convTableOnesDigit = {
    '1' : "one",
    '2' : "two",
    '3' : "three",
    '4' : "four",
    '5' : "five",
    '6' : "six",
    '7' : "seven",
    '8' : "eight",
    '9' : "nine",
    '10' : "ten",
    '11' : "eleven",
    '12' : "twelve",
    '13' : "thirteen",
    '14' : "fourteen",
    '15' : "fifteen",
    '16' : "sixteen",
    '17' : "seventeen",
    '18' : "eighteen",
    '19' : "nineteen",
}

const convTableTensDigit = {
    '0' : "oh ",
    '2' : "twenty ",
    '3' : "thirty ",
    '4' : "forty ",
    '5' : "fifty ",
}

const convTableHours = {

    '00' : "twelve",
    '01' : "one",
    '02' : "two",
    '03' : "three",
    '04' : "four",
    '05' : "five",
    '06' : "six",
    '07' : "seven",
    '08' : "eight",
    '09' : "nine",
    '10' : "ten",
    '11' : "eleven",
    '12' : "twelve",
    '13' : "one",
    '14' : "two",
    '15' : "three",
    '16' : "four",
    '17' : "five",
    '18' : "six",
    '19' : "seven",
    '20' : "eight",
    '21' : "nine",
    '22' : "ten",
    '23' : "eleven",
    '24' : "twelve"
}
function convert(data){
    const hour = `${data[0]}${data[1]}`;
    const min = `${data[3]}${data[4]}`;
    return digitToString(hour, min);
}
function digitToString(hour, min){   
   //handle edge cases for specific returns
   if (hour === "00" && min === "00"){ return "midnight";}
   if (hour === "12" && min === "00"){ return "noon";}

   //set AM/PM string based on the hour value
   var ampm = "am";
   if ((parseInt(hour)) > 11){
    ampm = "pm";
   }
   const hourStr = convTableHours[hour]
   var minStr = "";
   const minOnesDigit = min[1];
   const minTensDigit = min[0];
   if ((parseInt(minTensDigit)) >= 2 || minTensDigit === "0"){
    minStr = convTableTensDigit[minTensDigit];
    if (minOnesDigit !== '0'){
        minStr += convTableOnesDigit[minOnesDigit];
    }
    else{
        minStr = minStr.trimEnd()
    }
   }else{//minute is 1-19 inclusive
    minStr = convTableOnesDigit[min];
   }
   if (min === "00"){
        minStr = "o'clock"
   }
   const result = `${hourStr} ${minStr} ${ampm}`;
   return result;
}

module.exports = {convert}