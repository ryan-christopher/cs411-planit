import './style/App.css';
import { Routes, Route } from "react-router-dom";
import AppPage from './pages/app';
import About from './pages/about';
import Team from './pages/team';
import Home from './pages/index';
import React from "react";



const App = () => {
  return (
    <div className="App">
      <Routes>
        {/*All our Routes goes here!*/}
        <Route path="/" element={<Home />} />
        <Route path="app" element={<AppPage />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
      </Routes>
    </div>
  );
}



export default App;