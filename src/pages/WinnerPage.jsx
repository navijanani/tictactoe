import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGame, resetGameAll } from "../actions/gameActions";
import { Link } from "react-router-dom";

const WinnerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { winner } = useSelector((state) => state.game);

  

const handleReset = () => {
    dispatch(resetGame());  
    navigate("/GameBoard");  
  };

  const handleHomeClick = () => {
    dispatch(resetGameAll());  
    navigate("/");  
  };
  if (!winner) return (
    <>
        <h2>It's a draw!</h2>
    
        <button             onClick={() => handleReset()}
            >Play Again</button>
             <Link to="/">
              <button  onClick={() => handleHomeClick()}     >Home</button>
            </Link>
      </>
      )

  return (
    <>
      <div className="winner-page">
        <h1>🎉 Congratulations! 🎉</h1>
        <h2>{winner.name} is the Winner! ({winner.symbol})</h2>
        <Link to="/">
          <button  onClick={() => handleHomeClick()}     >Home</button>
        </Link>
      </div>
      <div>
        <button             onClick={() => handleReset()}
        >Play Again</button>
      </div>
    </>
  );
};

export default WinnerPage;
