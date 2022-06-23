import './App.css';
import Header from "./Header";
import React from 'react';
import SideBar from './SideBar';
import ListArticles from './ListArticles';
import axios from "axios";
import { useState, useEffect } from "react";


function App() {

  const [ingredients, setIngredients] = useState(null);
  const [categories, setCategories] = useState(null);
  const [cocktails, setCocktails] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInitialData = async() => {
      try{
        const responseIngredients = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`
        );
        const responseCategories = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
        )
        const responseCocktails = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`
        )
        /*
        console.log("data received")
        console.log(responseIngredients.data);
        console.log("categories received");
        console.log(responseCategories.data);
        console.log("Cocktails")
        console.log(responseCocktails.data);
        */
        setIngredients(responseIngredients.data);
        setCategories(responseCategories.data);
        setCocktails(responseCocktails.data);
        setError(null); //To avoid showing errors
      } catch(err) {
        setError(err.message);
        setIngredients(null);
      } finally {
        setLoading(false); //Always finish after loading
      }
    };
    getInitialData();
  },[])

  const onChangeFilter = (value) => {
    console.log("value changed:",value);
    setSelectedIngredients(value);
    console.log(selectedIngredients);
  }
  return (
    <div className="App">
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {!ingredients && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <Header />
      {ingredients && (
        <div>
          <SideBar ingredients = {ingredients} categories= { categories } onChangeFilter={onChangeFilter}/>
          <ListArticles />
        </div>
        )
        
      }
      
    </div>
  );
}

export default App;
