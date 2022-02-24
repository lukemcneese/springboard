"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  let showStar = Boolean(currentUser);
  let showRemove = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        ${showStar ? getStarHTML(story, currentUser): ""}
        ${showRemove ? getRemoveHTML(): ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

//newStoryButton
async function submitStory(evt) {
  console.debug("submitStory", evt);
  evt.preventDefault();

  const title = $("#newStory-title").val();
  const author = $("#newStory-author").val();
  const url = $("#newStory-url").val();
  let newestStory = await storyList.addStory(currentUser,{title:title, author: author, url:url});
  let markedUpStory = generateStoryMarkup(newestStory);
  $allStoriesList.prepend(markedUpStory);

  $submitForm.trigger("reset");
  $submitForm.hide();
  $allStoriesList.show();
}

$submitForm.on("submit", submitStory);


function getStarHTML(story, user){
  let isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `<span class="star">
            <i class ="${starType} fa-star"></i>
            </span>`;
}

function getRemoveHTML(){
  return `<span class ="remove">
    <i class="fas fa-trash-alt"></i>
    </span>`;
}


async function toggleFavorite(evt){
  console.debug("toggleFavorite");

  let $closestLI = $(evt.target).closest("li");
  let storyID = $closestLI.attr("id");
  let story = storyList.stories.find(s => s.storyId === storyID);

  if($(evt.target).hasClass("fas")){
    await currentUser.removeFavorite(story);
    $(evt.target).closest("i").toggleClass("fas far");
  }
  else{
    await currentUser.addFavorite(story);
    $(evt.target).closest("i").toggleClass("fas far");
  }
}

$allStoriesList.on("click", ".star", toggleFavorite);


async function removeStory(evt){
  console.debug("removeStory");
  let $closestLI = $(evt.target).closest("li");
  let storyID = $closestLI.attr("id");
  let story = storyList.stories.find(s => s.storyId === storyID);
  //remove Story from the StoryList Class
  await storyList.removeStory(currentUser, story);
  //reload StoryList on HTML
  await putStoriesOnPage();
}


$allStoriesList.on("click", ".remove", removeStory)

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}