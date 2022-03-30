// class BoggleGame {
//     constructor(secs = 60){
//         this.secs = secs;
//         this.score = 0;
//         this.words = new Set();
//         $(".add-word").on("submit", this.validateWord.bind(this));
//     }
//     async validateWord(event){
//         event.preventDefualt();
//         const guess = $(".word").val();
//         if (!guess) return;
//         const response = await axios.get("/validate_word", {params:{"guess":guess}});
//         message = response.data.result;
//         console.log("this is the result" & message);
//         if (message === "not-word"){
//             flashMessage(`${guess}is not an English word`)
//         }
//         else if(message == "not-on-board"){
//             flashMessage(`${guess}is not an on the board`)
//         }
//     }
//     flashMessage(msg){
//         $("#msg").val(msg);
//     }

// }

async function validateWord(event){
    console.log("we are in ValidateWord")
    event.preventDefualt();
    const guess = $(".word").val();
    if (!guess) return;
    const response = await axios.get("/validate_word", {params:{"guess":guess}});
    message = response.data.result;
    console.log("this is the result" & message);
    if (message === "not-word"){
        flashMessage(`${guess}is not an English word`)
    }
    else if(message == "not-on-board"){
        flashMessage(`${guess}is not an on the board`)
    }
}
$(document).on("submit", ".add-word", validateWord)
