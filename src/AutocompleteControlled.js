import React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { createStyles, makeStyles } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const style = {
    width: 400,
    marginTop:'10px',
  };

let User = [
  { id: 1, name: "name 1" },
  { id: 2, name: "name 2" },
  { id: 3, name: "name 3" },
  { id: 4, name: "name 4" },
  { id: 5, name: "name 5" },
];

export default function AutocompleteControlled() {
  const [value, setValue] = useState([User[0].name]);

  console.log("value: ", value);

  return (
    <div sx={style}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        multiple
        id="tags-filled"
        options={User.map((option) => option.name)}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Users"
            placeholder="Search"
          />
        )}
      />
    </div>
  );
}