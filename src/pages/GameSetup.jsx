import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setPlayers } from "../actions/gameActions";

const GameSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState(mode === "ai" ? "AI" : "");
  const [symbol1, setSymbol1] = useState("X");

  const handleStart = (e) => {
    e.preventDefault();
    
    const players = [
      { name: player1, symbol: symbol1 },
      { name: mode === "ai" ? "AI" : player2, symbol: symbol1 === "X" ? "O" : "X" },
    ];

    // Dispatch players' data
    dispatch(setPlayers(players));
    
    // Navigate to the GameBoard
    navigate("/GameBoard");
  };

  return (
    <div className="container">
      <h2>Game Setup</h2>
      <form onSubmit={handleStart}>
        <div>
          <label>Enter Player 1 Name:</label>
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            required
          />
          {mode === "friends" && (
            <>
              <label>Enter Player 2 Name:</label>
              <input
                type="text"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                required
              />
            </>
          )}
        </div>
        <div>
          <label>Set Player 1 Symbol:</label>
          <select
            value={symbol1}
            onChange={(e) => setSymbol1(e.target.value)}
          >
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
        </div>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default GameSetup;
