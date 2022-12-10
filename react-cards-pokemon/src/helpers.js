import { v4 as uuid } from "uuid";

/* Select a random element from values array. */
function choice(values) {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}


function formatCard(data) {
  return {
    image: data.cards[0].image,
    id: uuid()
  };
}
export { choice, formatCard };