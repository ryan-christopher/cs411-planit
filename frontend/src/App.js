import './style/App.css';
import { Routes, Route } from "react-router-dom";
import AppPage from './pages/app';
import About from './pages/about';
import Team from './pages/team';
import Home from './pages/index';
import Profile from './pages/profile';
import React from "react";

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/*All our routes go here!*/}
        <Route path="/" element={<Home />} />
        <Route path="app" element={<AppPage />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}



export default App;