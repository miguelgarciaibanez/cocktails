import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ModalWindow from './ModalWindow';
import {useState} from 'react';


export default function ListArticles(props) {
  
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [nameDrinkSearched, setNameDrinkSearched] = useState(null);
  const handleOpen = (item) => {setOpen(true); setSelectedItem(item);}
  const handleClose = () => {setOpen(false); setSelectedItem(null);}
  
  const handeChangeDrinkName = (event) => {
    setNameInput(event.target.value);
  }

  const clearSearchByName = () =>{
    setNameInput('');
    setNameDrinkSearched(null);
    props.onHandleEraseSearchByName();
  }

  const handleSearch = () => {    
    setNameDrinkSearched(nameInput);
    props.onHandleSearchByName(nameInput);
  }


    return (
      <div>
        <Toolbar />
        <TextField
          id="outlined-helperText"
          label="Cocktail Name"
          value={nameInput}
          sx={{ marginLeft:"240px", marginTop:"20px"}}
          size="small"
          onChange={handeChangeDrinkName}
          InputProps={{
            endAdornment: <InputAdornment position="end">
                          {nameDrinkSearched ? 
                            <IconButton
                                aria-label="Search"
                                onClick={clearSearchByName}
                                edge="end"
                              >
                                <ClearIcon />
                            </IconButton> :
                            <IconButton
                              aria-label="Search"
                              onClick={handleSearch}
                              edge="end"
                            >
                               <SearchIcon />
                            </IconButton>
                          }
                          </InputAdornment>
          }}
        />
        <Box sx={{ height:"100%"}}>
          <List sx={{ marginLeft:"250px", maxHeight:"500px", overflow:"auto"}}>
          {props.cocktails.map((cocktail) => (
            <ListItem
              alignItems="flex-start"
              key={cocktail.idDrink}
              disableGutters
            >
              {cocktail.strDrink}
              <Button onClick={() => {handleOpen(cocktail)}}>{cocktail.strDrink}</Button>
            </ListItem>
          ))}
          </List>
          { open && 
            <ModalWindow open={open} handleClose={handleClose} selectedItem={selectedItem}/>
            }
        </Box>
      </div>
      
    )
    
}