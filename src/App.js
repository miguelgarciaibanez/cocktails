import './App.css';
import Header from "./Header";
import React from 'react';
import SideBar from './SideBar';
import ListArticles from './ListArticles';

function App() {

  return (
    <div className="App">
      <Header />
      <SideBar />
      <ListArticles />
    </div>
  );
}

export default App;
