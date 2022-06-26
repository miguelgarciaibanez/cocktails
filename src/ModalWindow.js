import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ModalWindow(props) {

    const [cocktailInfo, setCocktailInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getInitialDataInfo = async() => {
          try{
            const responseCocktail = await axios.get(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${props.selectedItem.idDrink}`
            );
            console.log(responseCocktail.data.drinks[0]);
            setCocktailInfo(responseCocktail.data.drinks[0]);
          } catch(err) {
            setCocktailInfo(null);
          } finally {
            setLoading(false); //Always finish after loading
          }
        };
        getInitialDataInfo();
      },[])

    return (
        <div>
        {loading && <div>A moment please...</div>}
        {cocktailInfo &&
            <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {cocktailInfo.strDrink}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {cocktailInfo.strCategory}
                    </Typography>
                </Box>
            </Modal>
        }
        </div>
    )
}