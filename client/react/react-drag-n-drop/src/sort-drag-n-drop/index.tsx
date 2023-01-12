import { useState } from 'react';
import './SortDragAndDrop.css';

interface Card {
  id: number;
  order: number;
  text: string;
}

export default function SortDragAndDrop() {
  const [cardList, setCardList] = useState<Card[]>([
    { id: 1, order: 3, text: 'card 3' },
    { id: 2, order: 1, text: 'card 1' },
    { id: 3, order: 2, text: 'card 2' },
    { id: 4, order: 4, text: 'card 4' },
  ]);

  const [currentCard, setCurrentCard] = useState<Card>();

  const sortCards = (a: Card, b: Card) => {
    return a.order - b.order;
  };

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, card: Card) {
    console.log(card.text);
    setCurrentCard(card);
  }

  function handleDragEnd(e: any) {
    e.target.style.background = '';
  }

  function handleDragOver(e: any) {
    e.preventDefault();

    e.currentTarget.style.background = 'lightgray';
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, card: Card) {
    e.preventDefault();
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard?.order || c.order };
        }

        if (c.id === (currentCard?.id || 0)) {
          return { ...c, order: card.order };
        }

        return c;
      })
    );

    e.currentTarget.style.background = '';
  }

  return (
    <div className="app">
      {cardList.sort(sortCards).map((card) => (
        <div
          key={card.id}
          draggable={true}
          className="card"
          onDragStart={(e) => handleDragStart(e, card)}
          onDragLeave={(e) => handleDragEnd(e)}
          onDragEnd={(e) => handleDragEnd(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, card)}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}
