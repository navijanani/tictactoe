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

export const setSymbols = (symbol) => ({
  type: SET_SYMBOLS,
  payload: symbol,
});

export const makeMove = (index) => ({
  type: MAKE_MOVE,
  payload: index,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const setWinner = (winner) => ({
  type: SET_WINNER,
  payload: winner,
});
export const resetGameAll = () => ({
  type: RESET_GAME_ALL,
});

