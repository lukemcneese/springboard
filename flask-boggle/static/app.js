class BoggleGame {
    constructor(secs = 60){
        this.secs = secs;
        this.score = 0;
        this.words = new Set();
        $(".add-word").on("submit", this.validateWord.bind(this));
    }
    async validateWord(event){
        event.preventDefualt();
        const guess = $(".guess").val();
        if (!guess) return;
        console.log(guess);
        const response = await axios.post("/validate_word", {params:{"guess":guess}});
        message = response.data.result;
        console.log(message);
        if (message === "not-word"){
            flashMessage(`${guess}is not an English word`)
        }
        else if(message == "not-on-board"){
            flashMessage(`${guess}is not an on the board`)
        }
    }
    flashMessage(msg){
        $("#msg").val(msg);
    }

}
