const url = "http://numbersapi.com/"
const json = {params:"json"}
let promise = axios.get(`${url}42`,json)
//console.log(promise)

promise = axios.get(`${url}1,2,3`,json)
//console.log(promise)

let fourFactPromises = [];
for (let i = 0; i< 4; i++){
    fourFactPromises.push(
        axios.get(`${url}42`,json)
    );
}
Promise.all(fourFactPromises)
    .then(factArr => {
        for (res of factArr){
            let fact = res.data
            $('#numfacts').append(`<li>${fact}</li>`)
        }
    })

const base_url = "http://deckofcardsapi.com/api/deck/"
params = {"deck_count" : "1"}
promise = axios.get(`${base_url}new/shuffle/`,params)
let deck_id = promise.data.deck_id
promise.then(
    p1 =>{
        return axios.get(`${base_url}/${deck_id}/draw`,{"count":"1"})
    })
    .then(p2 =>{
        return axios.get(`${base_url}/${deck_id}/draw`,{"count":"1"})
    });

let $btn = $('button');
let $cards = $('#cards');

$btn.on('click', function(){
    promise = axios.get(`${base_url}/${deck_id}/draw`,{"count":"1"});
    let card = `${promise.data.cards[0].value} of ${promise.data.cards[0].suit}`;
    $cards.append(`<li>${card}</li>`);
    if(promise.data.remaining === 0) $btn.remove();
});

