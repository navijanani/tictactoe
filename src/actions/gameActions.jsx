import {
  SET_PLAYERS,
  SET_SYMBOLS,
  MAKE_MOVE,
  RESET_GAME,
  SET_WINNER,
  RESET_GAME_ALL,
} from './actionType';

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  payload: players,
});

// Action to set symbols for players
export const setSymbols = (symbol) => ({
  type: SET_SYMBOLS,
  payload: symbol,
});

// Action for a move on the board
export const makeMove = (index) => ({
  type: MAKE_MOVE,
  payload: index,
});

// Action to reset the game
export const resetGame = () => ({
  type: RESET_GAME,
});

// Action to set winner
export const setWinner = (winner) => ({
  type: SET_WINNER,
  payload: winner,
});
// gameActions.js
// Action to reset everything
export const resetGameAll = () => ({
  type: RESET_GAME_ALL,
});

