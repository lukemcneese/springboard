/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let year = $("#year").val();
    let color = $("#color").val();
    const resp = await axios.post('/api/get-lucky-num',{
        name,
        email,
        year,
        color
    });
    handleResponse(resp.data);
}

/** handleResponse: deal with response from our lucky-num API. */

async function handleResponse(resp) {
    //update errors based on error json
    if(resp.hasOwnProperty('errors')){
        if (resp.errors.hasOwnPoperty('name')){
            $("#name-err").append(resp.errors.name)
        }
        if (resp.errors.hasOwnPoperty('email')){
            $("#email-err").append(resp.errors.email)
        }
        if (resp.errors.hasOwnPoperty('year')){
            $("#year-err").append(resp.errors.year)
        }
        if (resp.errors.hasOwnPoperty('color')){
            $("#color-err").append(resp.errors.color)
        }
    }
    //print output in the result div
    $("#lucky-results").append(`
    <p>Your luck number is ${resp.num.num} (${resp.num.fact})</p>
    <p>Your birth year (${resp.year.year}) fact is ${resp.year.fact}    
    `)
}
$("#lucky-form").on("submit", processForm);
