import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';
import './Board.css';

const Board = (props) => {
  const { board, cards, onDeleteCard, onLikeCard, onPostCard } = props;

  return (
    <section className="board board-flex">
      <div className="board-header">
        <h1>{board.title} - {board.owner}</h1>
      </div>
      <div className="board-cards-list">
        <CardList
          cards={cards}
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
