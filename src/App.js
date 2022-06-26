import './App.css';
import Header from "./Header";
import React from 'react';
import SideBar from './SideBar';
import ListArticles from './ListArticles';
import axios from "axios";
import { useState, useEffect } from "react";


function App() {

  const [alcoholic, setAlcoholic] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [categories, setCategories] = useState(null);
  const [glass, setGlass] = useState(null);
  const [cocktails, setCocktails] = useState(null);
  const [cocktailsFiltered, setCocktailsFiltered] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGlass, setSelectedGlass] = useState(null);
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
        );
        const responseGlass = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`
        );
        const responseCocktails = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`
        );

        setIngredients(responseIngredients.data);
        setCategories(responseCategories.data);
        setGlass(responseGlass.data);
        setCocktails(responseCocktails.data.drinks);
        setCocktailsFiltered(null);
        setError(null); //To avoid showing errors
      } catch(err) {
        setError(err.message);
        setIngredients(null);
        setCategories(null);
        setGlass(null);
      } finally {
        setLoading(false); //Always finish after loading
      }
    };
    getInitialData();
  },[])

  const onHandleAlcoholic = ( value ) =>{
    setAlcoholic( value );
  }

  const onHandleChangeIngredient = (value) => {
    setSelectedIngredient( value ? value.strIngredient1 : value );
  }

  const onHandleChangeCategory = (value) =>{
    setSelectedCategory( value ? value.strCategory : value );
  }
  
  const onHandleChangeGlass = (value) =>{
    setSelectedGlass( value ? value.strGlass : value );
  }

  const onHandleSearchByName = async ( value ) => {
    console.log(value);
    try{
      setLoading(false);
      //
      const responseSearchByName = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`+value
      );
      setCocktailsFiltered(responseSearchByName.data);
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false); //Always finish after loading
    }
  }

  const onHandleEraseSearchByName = ()=> {
    setCocktailsFiltered(null);
  }

  const onApplyFilter = async() => {
    try{
      let alcoholicFilter = alcoholic ? 'Alcoholic' : 'Non_Alcoholic'
      let alcoholicFilterResponse = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholicFilter}`);
      let ingredientFilterResponse = selectedIngredient ? await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`) : null;
      let categoryFilterResponse = selectedCategory ? await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`) : null;
      let glassFilterResponse = selectedGlass ? await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${selectedGlass}`) : null;

      let alcoholicFiltered = alcoholicFilterResponse ? alcoholicFilterResponse.data.drinks : null;
      let ingredientFiltered = ingredientFilterResponse ? ingredientFilterResponse.data.drinks : null;
      let categoryFiltered = categoryFilterResponse ? categoryFilterResponse.data.drinks : null;
      let glassFiltered = glassFilterResponse ? glassFilterResponse.data.drinks : null;

      if ( ingredientFiltered ) {
        alcoholicFiltered = alcoholicFiltered.filter( (cocktail) => {
          return ingredientFiltered.some( (ing) => {
            return cocktail.idDrink === ing.idDrink;
          })
        });
      }

      if ( categoryFiltered ) {
        alcoholicFiltered = alcoholicFiltered.filter( (cocktail) => {
          return categoryFiltered.some( (cat) => {
            return cocktail.idDrink === cat.idDrink;
          })
        });
      }

      if ( glassFiltered ) {
        alcoholicFiltered = alcoholicFiltered.filter( (cocktail) => {
          return glassFiltered.some( (glas) => {
            return cocktail.idDrink === glas.idDrink;
          })
        });
      }
      setCocktailsFiltered(alcoholicFiltered);

    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false); //Always finish after loading
    }
    
  }

  const onCleanFilter = () => {
    setSelectedIngredient(null);
    setSelectedCategory(null);
    setSelectedGlass(null);
    setCocktailsFiltered(null);
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
          <SideBar 
            ingredients = {ingredients} 
            categories= { categories } 
            glass = { glass }
            onHandleChangeIngredient={onHandleChangeIngredient} 
            onHandleAlcoholic={onHandleAlcoholic}
            onHandleChangeCategory={onHandleChangeCategory}
            onHandleChangeGlass={onHandleChangeGlass}
            onApplyFilter={onApplyFilter}
            onCleanFilter={onCleanFilter}
          />
          <ListArticles cocktails={ cocktailsFiltered ? cocktailsFiltered: cocktails } 
                        onHandleSearchByName={onHandleSearchByName}
                        onHandleEraseSearchByName={onHandleEraseSearchByName}/>
        </div>
        )
        
      }
      
    </div>
  );
}

export default App;
