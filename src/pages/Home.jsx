import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>


         <div className="home">
          <div className="Homes">
            <div className="Box">
              <h2>Play with AI</h2>
              <Link to="/GameSetup?mode=ai">
                <button>Start Game</button>
              </Link>
            </div>
            <div className="Box">
              <h2>Play With Friends</h2>
              <Link to="/GameSetup?mode=friends">
                <button>Start Game</button>
              </Link>
            </div>
          </div>
      </div> 
    </>
  );
};

export default Home;
