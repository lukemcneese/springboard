/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

async function searchShows(query) {
  try{
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
    let shows = res.data.map(result =>{
      return {
        id: result.show.id,
        name: result.show.name,
        summary: result.show.summary,
        image: result.show.image ? result.show.image.medium : "https://tinyurl.com/tv-missing"
      };
    });
    return shows;
  }
  catch(err){
    console.error("Error response:");
    console.error(err.response.data);
    console.error(err.response.status);
    console.error(err.response.headers)
  }
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="card-img-top" src=${show.image}></img>
             <button class="btn btn-secondary EpisodeBtn">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}
function populateEpisodes(episodes){
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
  for (let episode of episodes) {
    let $item = $(`<li>${episode.name} (Season ${episode.season},number ${episode.number})</li>`);
    $episodesList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();
  let query = $("#search-query").val();
  if (!query) return;
  $("#episodes-area").hide();
  let shows = await searchShows(query);
  populateShows(shows);
});





/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  try{
    const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
    let episodes = res.data.map(result =>{
      return {
        id: result.id,
        name: result.name,
        season: result.season,
        number: result.number,
        runtime: result.runtime
      };
    });
    return episodes;
  }
  catch(err){
    console.error("Error response:");
    console.error(err.response.data);
    console.error(err.response.status);
    console.error(err.response.headers)
  }
}

$("#shows-list").on("click",".EpisodeBtn",  async function handleShowEpisodes (evt){
  evt.preventDefault();
  //get ShowID from the HTML for the Show
  const showID = $(this).closest(".Show").data("show-id");
  //get the episodes from tvmaze
  const episodes = await getEpisodes(showID);
  //add the episodes to the episode area`
  populateEpisodes(episodes);
  $("#episodes-area").show();
});