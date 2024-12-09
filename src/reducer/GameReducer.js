import {
  SET_PLAYERS,
  SET_SYMBOLS,
  MAKE_MOVE,
  RESET_GAME,
  SET_WINNER,
  RESET_GAME_ALL,
} from "../actions/actionType";

const initialState = {
  players: [],            // List of players
  currentPlayer: null,    // Active player
  board: Array(9).fill(null), // Game board
  winner: null,           // Winner of the game
  isGameOver: false,      // Game over status
  mode: null,             // Game mode ("ai" or "friends")
};
const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS: {
      return {
        ...state,
        players: action.payload,
        currentPlayer: action.payload[0] || null, // Ensure the first player is set as current player
        mode: action.payload.length === 2 ? "friends" : "ai",
      };
    }
    
    
    
    case SET_SYMBOLS:
      return {
        ...state,
        players: state.players.map((player, index) => ({
          ...player,
          symbol: index === 0 ? action.payload : action.payload === "x" ? "o" : "x",
        })),
      };

      case MAKE_MOVE: {
        const { payload: index } = action;
      
        if (state.board[index] === null && !state.isGameOver) {
          const newBoard = [...state.board];
          newBoard[index] = state.currentPlayer.symbol;
      
          const winningCombo =
           [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          let winner = null;
          for (const [a, b, c] of winningCombo) {
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
              winner = state.players.find((player) => player.symbol === newBoard[a]);
              break;
            }
          }
      
          const nextPlayer = state.players.find(
            (player) => player.symbol !== state.currentPlayer.symbol
          );
      
          const isAiMode = state.mode === "ai";
      
          return {
            ...state,
            board: newBoard,
            currentPlayer: winner
              ? null
              : isAiMode && nextPlayer?.name === "AI"
              ? nextPlayer // Set AI as the current player
              : nextPlayer, // Otherwise, switch to the next player
            winner: winner,
            isGameOver: !!winner || newBoard.every((cell) => cell !== null),
          };
        }
        return state;
      }
      
      

    case SET_WINNER:
      return {
        ...state,
        winner: action.payload,
        isGameOver: true,
      };

    case RESET_GAME: {
      return {
        ...state,
        board: Array(9).fill(null),      // Reset board to empty cells
        currentPlayer: state.players[0], // Set current player back to player 1
        winner: null,                    // Reset winner
        isGameOver: false,               // Reset game over status
      };
    }

    case RESET_GAME_ALL: {
      return {
        ...state,
        board: Array(9).fill(null),      // Reset board to empty cells
        currentPlayer:null, // Clear the current player
        winner: null,                    // Reset winner
        isGameOver: false,               // Reset game over status
        players: [], // Reset players
        mode: null,                      // Reset mode (AI or friends)
      };
    }

    default:
      return state; // Return the current state if no action matches
  }
};

export default GameReducer;
