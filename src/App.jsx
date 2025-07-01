import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';
import axios from 'axios';

const KBaseURL = import.meta.env.VITE_API_BASE_URL
console.log('Base URL:', KBaseURL);

// Main App component:
// - Fetches boards from the backend (GET request)
// - Allows creating a new board (POST request)
// - Lets users select a board to display its cards
// - Supports deleting and liking cards, and counting card likes

const convertFromApiBoard = (board) => {
  const { id: boardId, title, owner, cards } = board;
  return { id: boardId, title, owner, cards };
};

const convertFromApiCard = (card) => {
  const { id: cardId, message, likes_count: likesCount, board_id: boardId } = card;
  return { id: cardId, message, likesCount, boardId };
};

const getAllBoardsFromAPI = () => {
  return axios.get(`${KBaseURL}/boards`)
    .then(response => {
      console.log('Boards API response:', response.data);
      return response.data.map(convertFromApiBoard);
    })
    .catch(error => {
      console.error('Error fetching boards:', error);
    });
};

const addNewBoardAPI = (newBoardData) => {
  return axios.post(`${KBaseURL}/boards`, newBoardData)
    .then(response => {
      console.log("Raw API response for new board:", response.data);
      return convertFromApiBoard(response.data);
    })
    .catch(error => {
      console.error('Error adding new board:', error);
    });
};

const getCardsForBoardAPI = (boardId) => {
  return axios.get(`${KBaseURL}/boards/${boardId}/cards`)
    .then(response => {
      console.log("Raw API response for cards:", response.data);
      return response.data.map(convertFromApiCard);
    })
    .catch(error => {
      console.error('Error fetching cards for board:', error);
    });
};

const addNewCardAPI = (newCardData) => {
  console.log("Posting new card:", newCardData);
  console.log("API URL for new card:", `${KBaseURL}/boards/${newCardData.board_id}/cards`);
  return axios.post(`${KBaseURL}/boards/${newCardData.board_id}/cards`, newCardData)
    .then((response) => {
      
      return convertFromApiCard(response.data);
    })
    .catch((error) => {
        console.error('Error adding new card:', error);
    });
};

const deleteCardAPI = (cardId) => {
  return axios.delete(`${KBaseURL}/cards/${cardId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting card:', error);
    });
};

const likeCardAPI = (cardId) => {
  return axios.put(`${KBaseURL}/cards/${cardId}/likes`)
    .then(response => { 
      console.log("Raw API response for liking card:", response.data); 
      return convertFromApiCard(response.data); 
    })
    .catch(error => {
      console.error('Error liking card:', error);
    });
};

const App = () => {
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cardData, setCardData] = useState([]);

  // Fetch all boards on mount
  const getAllBoards = () => {
    getAllBoardsFromAPI()
      .then((boards) => {
        setBoardData(boards);
      });
  };
  useEffect(() => {
    getAllBoards();
  }, []);

  const addBoard = (newBoardData) => {
    return addNewBoardAPI(newBoardData)
      .then((newBoard) => {
        setBoardData((boardData) => {
          return [...boardData, newBoard];
        });
      });
  };

  const addCard = (newCardData) => {
    return addNewCardAPI(newCardData)
      .then((newCard) => {
        setCardData((cardData) => {
          return [...cardData, newCard];
        });
      });
  };

  const deleteCard = (cardId) => {
    return deleteCardAPI(cardId)
      .then(() => {
        setCardData((cardData) => {
          return cardData.filter(card => card.id !== cardId);
        });
      });
  };

  const likeCardHandler = (cardId) => {
    return likeCardAPI(cardId)
      .then((updatedCard) => {
        setCardData((cardData) => {
          return cardData.map(card => {
            if (card.id === cardId) {
              return { ...card, likesCount: updatedCard.likesCount };
            } else {
              return card;
            }
          });
        });
      });
  };

  // Handle selecting a board and fetching its cards
  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
    getCardsForBoardAPI(board.id).then((cards) => {
      setCardData(cards);
    });
  };

  return (
    <div className="app">
      <h1>
        <span className="star">✨</span>
        <span className="board-title">Inspiration Board</span>
        <span className="star">✨</span>
      </h1>
      <div className="main-content">
        <section className="boards-list">
          <h2>Boards</h2>
          <ul>
            {[...boardData]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(board => (
                <li key={board.id}>
                  <button
                    onClick={() =>
                      selectedBoard && selectedBoard.id === board.id
                        ? setSelectedBoard(null)
                        : handleSelectBoard(board)
                    }
                    className={selectedBoard && selectedBoard.id === board.id ? 'selected' : ''}
                  >
                    {board.title}
                  </button>
                </li>
              ))}
          </ul>
          <NewBoardForm onCreateBoard={addBoard} />
        </section>
        <section className="board-cards-area">
          {selectedBoard && (
            <Board
              key={selectedBoard.id}
              board={selectedBoard}
              cards={cardData}
              onDeleteCard={deleteCard}
              onLikeCard={likeCardHandler}
              onPostCard={addCard}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
