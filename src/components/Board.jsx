import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';
import './Board.css';
import { useState, useEffect } from 'react';

const Board = (props) => {
  const { board, cards, onDeleteCard, onLikeCard, onPostCard } = props;
  const [cardSortOptions, setCardSortOptions] = useState("");

  useEffect(() => {
    setCardSortOptions("")
  }, [cards]);

  const getSortedCards = () => {
    if (cardSortOptions === "likes") {
      return [...cards].sort((a, b) => b.likesCount - a.likesCount);
    }
    if (cardSortOptions === "message") {
      return [...cards].sort((a, b) => a.message.localeCompare(b.message));
    }
    if (cardSortOptions === "id") {
      return [...cards].sort((a, b) => a.id - b.id);
    }
    return cards;
  };

  return (
    <section className="board board-flex">
      <div className="board-header">
        <h1>{board.title} - {board.owner}</h1>
      </div>
      <div className="board-sort-options">
        <label htmlFor="sort-options">Sort by:</label>
        <select
          id="sort-options"
          value={cardSortOptions}
          onChange={(e) => setCardSortOptions(e.target.value)}
        >
          <option value="">Default</option>
          <option value="likes">Likes</option>
          <option value="message">Message Alphabetical</option>
          <option value="id">ID</option>
        </select>
      </div>
      <div className="board-cards-list">
        <CardList
          cards={getSortedCards()}
          onDeleteCard={onDeleteCard}
          onLikeCard={onLikeCard}
        />
      </div>
      <div className="board-new-card-form">
        <NewCardForm onPostCard={onPostCard} boardId={board.id} />
      </div>
    </section>
  );
};

Board.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Board;
