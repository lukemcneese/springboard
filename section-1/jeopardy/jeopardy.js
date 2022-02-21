// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    let head = "<thead><tr>"
    for(let category =0; category < categories.length; category++){
        head+=`<td>${categories[category].title}</td>`;
    }
    head += '</tr></thead><tbody></tbody>';
    let table = document.querySelector("#jeopardyTable");
    table.innerHTML = head;
    //$("#jeopardy").append(head);
    let row = "<tr>"
    for(let clueIndex = 0; clueIndex < 5; clueIndex++){
        for(let category =0; category < categories.length; category++){
        row+= `<td id="${categories[category].clues[clueIndex].id}">?</td>`;
        }
        table.innerHTML +=row;
        row = "<tr>";
    }
    table.addEventListener("click", handleClick);
    //$('#jeopardyTable').on("click","td",handleClick);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    //get the ID
    let uid = evt.target.id
    //find the ID in the array
    for(let clueIndex = 0; clueIndex < 5; clueIndex++){
        for(let category =0; category < categories.length; category++){
            if(categories[category].clues[clueIndex].id === uid){
                let showing = categories[category].clues[clueIndex].showing;
                if(showing === null){
                    $(`#${uid}`).text(categories[category].clues[clueIndex].question);
                    categories[category].clues[clueIndex].showing = "question";
                    return;
                }
                else if(showing === "question"){
                    $(`#${uid}`).text(categories[category].clues[clueIndex].answer);
                    categories[category].clues[clueIndex].showing = "answer";
                    return;
                }
                else if(showing === "answer"){
                    return;
                }
                else{
                    console.log("showing logic error");
                    console.log(showing);
                }
            }
        }
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    //$("#jeopardyTable").empty();
    $("#loadingscreen").show();
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $("#loadingscreen").hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    showLoadingView();
    try{
        //pull in 100 categories
        let res = await axios.get('http://jservice.io/api/categories?count=100');
        //select 6 of the 100 categories
        let temp =_.sampleSize(res.data,6);
        for(let i=0; i < temp.length; i++){
            let res = await axios.get(`http://jservice.io/api/clues?category=${temp[i].id}`);
            let clues = res.data.map(result =>{
                return{
                    question: result.question,
                    answer: result.answer,
                    showing: null,
                    id: String(temp[i].id)+"-"+String(result.id)
                }
            });
            //clues = clues.slice(0,5);
            clues =_.sampleSize(clues,5);
            let category = {
                title: temp[i].title,
                clues: clues
            };
            categories.push(category);
        }
    }
    catch(err){
        console.error("Error response:");
        console.error(err.response.data);
        console.error(err.response.status);
        console.error(err.response.headers);
    }
    //console.log(categories);
    fillTable();
    hideLoadingView();
}

/** On click of start / restart button, set up game. */

// TODO
$('#reset').on("click", async function(){
    categories = [];
    let table = document.querySelector("#jeopardyTable");
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }
    //$("#jeopardyTable").empty();
    setupAndStart();
});

/** On page load, add event handler for clicking clues */
// TODO
$(document).ready(setupAndStart());