import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeMove, resetGameAll } from "../actions/gameActions";
import { useNavigate } from "react-router-dom";
import "./style.css";

const GameBoard = () => {
  const { players, board, currentPlayer, isGameOver } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!players || players.length === 0) {
      navigate("/");
    }
  }, [players, navigate]);

  const winningCombo2 = (board, symbol) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] === symbol && board[b] === symbol && board[c] === null) {
        return c;
      }
      if (board[a] === symbol && board[b] === null && board[c] === symbol) {
        return b;
      }
      if (board[a] === null && board[b] === symbol && board[c] === symbol) {
        return a;
      }
    }
    return -1;
  };

  const aiMove = () => {
    if (currentPlayer?.name === "AI" && !isGameOver) {
      const winMove = winningCombo2(board, currentPlayer.symbol);
      if (winMove !== -1) {
        dispatch(makeMove(winMove));
        return;
      }

      const opponentSymbol = currentPlayer.symbol === "X" ? "O" : "X";
      const blockMove = winningCombo2(board, opponentSymbol);
      if (blockMove !== -1) {
        dispatch(makeMove(blockMove));
        return;
      }

      if (board[4] === null) {
        dispatch(makeMove(4));
        return;
      }

      const evenCornerMoves = [0, 2, 6, 8];
      const availableCorners = evenCornerMoves.filter(
        (index) => board[index] === null
      );
      if (availableCorners.length > 0) {
        const randomCorner =
          availableCorners[Math.floor(Math.random() * availableCorners.length)];
        dispatch(makeMove(randomCorner));
        return;
      }

      const edgeMoves = [1, 3, 5, 7];
      const availableEdges = edgeMoves.filter((index) => board[index] === null);
      if (availableEdges.length > 0) {
        const randomEdge =
          availableEdges[Math.floor(Math.random() * availableEdges.length)];
        dispatch(makeMove(randomEdge));
        return;
      }

      const emptyCells = board
        .map((cell, index) => (cell === null ? index : -1))
        .filter((index) => index !== -1);
      if (emptyCells.length > 0) {
        const randomEmptyCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        dispatch(makeMove(randomEmptyCell));
      }
    }
  };

  useEffect(() => {
    if (currentPlayer?.name === "AI" && !isGameOver) {
      const aiMoveTimeout = setTimeout(() => {
        aiMove();
      }, 500);
      return () => clearTimeout(aiMoveTimeout);
    }
  }, [currentPlayer, isGameOver, board, dispatch]);

  useEffect(() => {
    if (isGameOver) {
      navigate("/WinnerPage");
    }
  }, [isGameOver, navigate]);

  const handleClick = (index) => {
    if (board[index] !== null || currentPlayer?.name === "AI" || isGameOver) {
      return;
    }
    dispatch(makeMove(index));
  };

  const handleHomeClick = () => {
    dispatch(resetGameAll());
    navigate("/");
  };

  return (
    <div>
      <h1 className="Tit">XO Game</h1>
      <button onClick={handleHomeClick}>Home</button>
      <p>
        Current Player:{" "}
        {currentPlayer
          ? currentPlayer.name === "AI"
            ? "AI (thinking...)"
            : currentPlayer.name
          : "N/A"}
        <br />
        Current Symbol: {currentPlayer ? currentPlayer.symbol : "N/A"}
      </p>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? "filled" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
