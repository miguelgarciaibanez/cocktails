import { Drawer } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from 'react';

export default function SideBar( props ){

    const [selected, setSelected] = useState([]);

    const handleChange = (event) => {

      const value = event.target.value;
      /*
      if (value[value.length - 1] === "all") {
        setSelected(selected.length === options.length ? [] : options);
        return;
      }*/
      setSelected(value);
      console.log("value:", value);
      props.onChangeFilter(value);
    };
    const drawerWidth = 240;
    return(
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
          <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
          <Select
            labelId="mutiple-select-label"
            multiple
            value={selected}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {props.ingredients.drinks.map((drink, index) => (
              <MenuItem key={drink.strIngredient1} value={drink.strIngredient1}>
                <ListItemIcon>
                  <Checkbox checked={selected.indexOf(drink.strIngredient1) > -1} />
                </ListItemIcon>
                <ListItemText primary={drink.strIngredient1} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          
          </Box>
          </Drawer>
        )
    
}