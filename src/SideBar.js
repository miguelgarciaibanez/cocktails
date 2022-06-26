import { Drawer } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import Toolbar from "@mui/material/Toolbar";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from "react";

export default function SideBar(props) {

  const [valueAlcoholic, setValueAlcoholic] = useState(null);
  const [valueIngredient, setValueIngredient] = useState(null);
  const [valueCategory, setValueCategory] = useState(null);
  const [valueGlass, setValueGlass] = useState(null);

  const ingredients = {
    options: props.ingredients.drinks,
    getOptionLabel: (option) => option.strIngredient1
  }

  const categories = {
    options: props.categories.drinks,
    getOptionLabel: (option) => option.strCategory
  }

  const glass = {
    options: props.glass.drinks,
    getOptionLabel: (option) => option.strGlass
  }

  const handleChangeAlcoholic = (event) => {
    setValueAlcoholic(event.target.checked);
    props.onHandleAlcoholic(event.target.checked);
  }

  const handleChangeIngredient = (newValue) => {
    setValueIngredient(newValue);
    props.onHandleChangeIngredient(newValue);
  };

  const handleChangeCategory = (newValue) => {
    setValueCategory(newValue);
    props.onHandleChangeCategory(newValue);
  }

  const handleChangeGlass = (newValue) => {
    setValueGlass(newValue);
    props.onHandleChangeGlass(newValue);
  }

  const onCleanFilter = () =>{
    setValueAlcoholic(null);
    setValueIngredient(null);
    setValueCategory(null);
    setValueGlass(null);
    props.onCleanFilter();
  }

  const drawerWidth = 240;
  return (
    <Drawer variant="permanent"
      sx={{
        backgroundColor: 0x00000,
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }} >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <FormControl>
          <FormControlLabel
            control={<Checkbox onChange={handleChangeAlcoholic} checked={valueAlcoholic ? true : false}/>}
            label="Alcoholic"
            labelPlacement="start"
            value={valueAlcoholic}
          />
        </FormControl>
        <Stack spacing={2} sx={{ width: 220 }}>
          <Autocomplete
            {...ingredients}
            value = {valueIngredient}
            id="ingredients"
            onChange={(event, newValue) => {
              handleChangeIngredient(newValue);
            }}
            autoComplete
            includeInputInList
            renderInput={(params) => (
              <TextField {...params} label="Ingredient" variant="standard" />
            )}
          />
          <Autocomplete
            {...categories}
            id="categories"
            value = {valueCategory}
            onChange={(event, newValue) => {
              handleChangeCategory(newValue);
            }}
            autoComplete
            includeInputInList
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="standard" />
            )}
          />
          <Autocomplete
            {...glass}
            id="glass"
            value = {valueGlass}
            onChange={(event, newValue) => {
              handleChangeGlass(newValue);
            }}
            autoComplete
            includeInputInList
            renderInput={(params) => (
              <TextField {...params} label="Glass" variant="standard" />
            )}
          />
          <Button variant="contained" onClick={() => props.onApplyFilter()}>Filter</Button>
          <Button variant="contained" onClick={onCleanFilter}>Clear Filter</Button>
        </Stack>
      </Box>
    </Drawer>
  )

}