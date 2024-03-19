import React, { useState } from "react";
import axios from "../../../axios";

import './addDishModal.css';

import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import imageNotFound from '../notFound.png';
import { useParams, useNavigate } from "react-router-dom";

const AddDishModal = ({ active, setActive, dataMeal }) => {
    const [grams, setGrams] = useState(10);
    const id = useParams().date.slice(3);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate()

    const incrementGrams = () => {
        setGrams(prevGrams => prevGrams + 10);
    };

    const decrementGrams = () => {
        if (grams > 10) {
            setGrams(prevGrams => prevGrams - 10);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const refreshPage = () => {
        return navigate(0)
    }

    const handleCreateButtonClick = async () => {
        if (grams >= 10) {
            try {
                const calories = Math.floor(dataMeal.calories / 100 * grams);
                const data = {
                    id: dataMeal._id,
                    quantity: grams,
                    calories
                }
                const response = await axios.patch(`/stats/addMeal/${id}`, data);
                if (response) {
                    refreshPage()
                } else {
                    setSnackbarMessage('Ошибка при загрузке данных');
                    setSnackbarOpen(true);
                }
            }
            catch (err) {
                console.error('Error fetching data:', err);
                setSnackbarMessage('Ошибка при загрузке данных');
                setSnackbarOpen(true);
            }
        }
    };

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#242424',
                light: '#242424',
                dark: '#343434',
            },
            secondary: {
                main: '#6366F1',
            },

        },
        typography: {
            fontFamily: 'Montserrat'
        },
    });

    return (
        <>

            <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
                <div className="modalAddDish__content" onClick={(e) => { e.stopPropagation() }}>
                    <div className="mealModalContainer">
                        <div className='mealImage' style={{ backgroundImage: (dataMeal.image === "") ? `url(${imageNotFound})` : `url(http://localhost:4444${dataMeal.image})` }}></div>
                        <h2>{dataMeal.name}</h2>
                        <div className="mealDoc">
                            <div className="mealStats">
                                <p className='title'>Calories</p>
                                <p className='mealNum'>{(dataMeal.calories / 100 * grams).toFixed(1)}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Protein</p>
                                <p className='mealNum'>{(dataMeal.proteins / 100 * grams).toFixed(1)}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Carbon</p>
                                <p className='mealNum'>{(dataMeal.carbohydrates / 100 * grams).toFixed(1)}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Fats</p>
                                <p className='mealNum'>{(dataMeal.fats / 100 * grams).toFixed(1)}</p>
                            </div>
                        </div>
                        <div className="counterButtons">
                            <button onClick={decrementGrams}>-</button>
                            <input type="number" id="grams" name="grams" value={grams} min="10" onChange={(e) => setGrams(parseInt(e.target.value))} />
                            <button onClick={incrementGrams}>+</button>
                        </div>
                        <ThemeProvider theme={theme}>
                            <Button
                                style={{ width: '200px', height: '60px', boxShadow: 'none', borderRadius: '10px' }}
                                size="large"
                                variant="contained"
                                fullWidth
                                onClick={handleCreateButtonClick} // Добавляем обработчик события на нажатие кнопки
                            >
                                Create
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AddDishModal;
