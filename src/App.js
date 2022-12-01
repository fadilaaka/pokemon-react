import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPokemon from "./components/DetailPokemon";
import ListPokemon from "./components/ListPokemon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPokemon />} />
        <Route path="/detail/pokemon/:id" element={<DetailPokemon />} />
      </Routes>
    </BrowserRouter>
  );
}
