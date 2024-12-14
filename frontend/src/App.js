import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Introductory from './pages/Introductory';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import AllListed from './pages/AllListed';
import Find from './pages/Find';
import './styles/Global.css';

function App() {

  return (
    <div>
      {/* Permanent Logo */}
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '80px', marginBottom: '10px', alignSelf: 'center' }} />
        <h1 className="title" style={{margin: '0', textAlign: 'center'}}>SG CarPark Eh</h1>
      </header>


      <Routes>
        <Route path="/" element={<Introductory />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/AllListed" element={<AllListed />} />
        <Route path="/Find" element={<Find />} />
      </Routes>
      <p className="credits">Credits: Singapore URA Dataset</p>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
