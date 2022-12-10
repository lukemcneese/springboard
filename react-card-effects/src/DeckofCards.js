import React, { useState, useEffect, useRef } from "react";
import Card from "./Card"
import axios from "axios";

/** GitHub Profile Component --- shows info from GH API */

function DeckofCards() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  //load the deck upon first load
  useEffect(function fetchDeckWhenMouned(){ 
    async function setupDeck(){
      const newDeck = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeck(newDeck.data.deck_id);
    }
    setupDeck();
  },[setDeck]);
  
  useEffect(function fetchCardWhenMounted() {
    async function fetchCard() {
      try{
        const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
        if (card.data.remaining === 0){
          throw new Error("no cards remaining!");
        }
      const newCard = card.data.cards[0]
      setCards(card =>
        [...card, {
          code: newCard.code,
          image : newCard.image
        }])
      } catch (err) {
        alert(err);
      }
      }
      if (autoDraw && !timerRef.current) {
        timerRef.current = setInterval(async () => {
          await fetchCard();
        }, 1000);
      }
  return () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
      };
    }, [autoDraw, setAutoDraw, deck]);

    const toggleAutoDraw = () => {
      setAutoDraw(auto => !auto);
    };


  return (
    <div>
      <button onClick={toggleAutoDraw}>Draw a Card</button>
      {cards.map(({code,image}) =><Card code={code} key={code} image={image}/>)}
    </div>
  );
};
// end

export default DeckofCards;
