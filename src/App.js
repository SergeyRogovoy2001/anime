import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import Home from "./components/Home";
import Gallery from "./components/Gallery";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeItem />}/>
        <Route path="/character/:id" element={<Gallery />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
