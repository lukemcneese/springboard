$(document).ready(setupAndStart());
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
    let head = "<tr>"
    for(let category =0; category < categories.length; category++){
        head+=`<td>${categories[category].title}</td>`;
    }
    $('#jeopardy').append(`<th>${head}</tr></th><tbody></tbody>`);
    
    for(let category =0; category < categories.length; category++){
        let row = "<tr>";
        //console.log(categories[category].clues[0].question);
        //categories[category] Need to loop through each category and add the 1st question to the row
    }

}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    //$("#jeopardy").empty();
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
    //pull in 10 categories
    let res = await axios.get('http://jservice.io/api/categories?count=10');
    //select 6 of the 10 categories
    let temp =_.sampleSize(res.data,6);
    for(let i=0; i < temp.length; i++){
        let res = await axios.get(`http://jservice.io/api/clues?category=${temp[i].id}`);
        let clues = res.data.map(result =>{
            return{
                question: result.question,
                answer: result.answer,
                showing: null
            }
        });
        clues = clues.slice(0,5);
        let category = {
            title: temp[i].title,
            clues: clues
        };
        categories.push(category);
    }
    fillTable();
    hideLoadingView();


}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO