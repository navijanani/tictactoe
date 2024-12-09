import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameSetup from "./pages/GameSetup";
import GameBoard from "./pages/GameBoard";
import { Provider } from "react-redux";
import store from './store';
import WinnerPage from "./pages/WinnerPage";

// Path to your Redux store configuration

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Your Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/GameSetup" element={<GameSetup />} />
        <Route path="/GameBoard" element={<GameBoard />} />
        <Route path="/WinnerPage" element={<WinnerPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
