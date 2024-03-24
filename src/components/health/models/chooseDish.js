import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import '../modal.css';
import './chooseDish.css';

import { FaHome } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";
import { IoIosCreate, IoIosAdd } from "react-icons/io";

import imageNotFound from '../notFound.png'
import CreateDish from "./createDish";
import AddDishModal from "./addDish";

const DishModal = ({ active, setActive, id, defaultValues }) => {
    const [mealMode, setMealMode] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [meals, setMeals] = useState([]);
    const [renderMeals, setRenderMeals] = useState([]);
    const [myMeals, setMyMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addDishModalOpen, setAddDishModalOpen] = useState(false);
    const [dishModalInfo, setDishModalInfo] = useState([]);
    const userId = useSelector((state) => state.auth);

    const fetchMeals = async () => {
        try {
            const response = await axios.get('/meals');
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Ошибка при загрузке данных');
            setSnackbarOpen(true);
        }
    }

    useEffect(() => {
        fetchMeals();
    }, []);

    useEffect(() => {
        if (meals.length > 0) {
            fetchAllMeals();
            fetchMyMeals();
        }
    }, [meals]);

    const fetchAllMeals = () => {
        try {
            const mealsSlice = meals.slice(0, 4)
            const res = mealsSlice.map((meal, index) => (
                <div className="meal" key={index}>
                    <div className="mealOnHover" onClick={() => { setDishModalInfo(meal); setAddDishModalOpen(true) }}>
                        <IoIosAdd size="80px" color="rgba(206, 210, 210, 0.65)" />
                    </div>
                    <div className='mealImage' style={{ backgroundImage: (meal.image === "") ? `url(${imageNotFound})` : `url(http://localhost:4444${meal.image})` }}></div>
                    <div className="mealInfo">
                        <p className="mealTitle">{meal.name}</p>
                        <div className="mealDoc">
                            <div className="mealStats">
                                <p className='title'>Calories</p>
                                <p className='mealNum'>{meal.calories}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Protein</p>
                                <p className='mealNum'>{meal.proteins}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Carbon</p>
                                <p className='mealNum'>{meal.carbohydrates}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Fats</p>
                                <p className='mealNum'>{meal.fats}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ));
            setRenderMeals(res)
        } catch (error) {
            console.error('Error fetching data fetchAllMeals:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchMyMeals = () => {
        try {
            const mealsSlice = meals.filter(meal => meal.user?._id === userId.data.userData._id).slice(0, 4)
            const res = mealsSlice.map((meal, index) => (
                <div className="meal" key={index}>
                    <div className="mealOnHover" onClick={() => { setDishModalInfo(meal); setAddDishModalOpen(true) }}>
                        <IoIosAdd size="80px" color="rgba(206, 210, 210, 0.65)" />
                    </div>
                    <div className='mealImage' style={{ backgroundImage: (meal.image === "") ? `url(${imageNotFound})` : `url(http://localhost:4444${meal.image})` }}></div>
                    <div className="mealInfo">
                        <p className="mealTitle">{meal.name}</p>
                        <div className="mealDoc">
                            <div className="mealStats">
                                <p className='title'>Calories</p>
                                <p className='mealNum'>{meal.calories}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Protein</p>
                                <p className='mealNum'>{meal.proteins}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Carbon</p>
                                <p className='mealNum'>{meal.carbohydrates}</p>
                            </div>
                            <div className="mealStats">
                                <p className='title'>Fats</p>
                                <p className='mealNum'>{meal.fats}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ));
            setMyMeals(res)
        } catch (error) {
            console.error('Error fetching data fetchAllMeals:', error);
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSearch = (e) => {
        const value = e.target.value;

        const results = meals.filter((it) => {
            return it.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        })

        const resultsMy = results.filter(meal => meal.user?._id === userId.data.userData._id);

        const finalRes = results.map((meal, index) => (
            <div className="meal" key={index}>
                <div className="mealOnHover" onClick={() => { setDishModalInfo(meal); setAddDishModalOpen(true) }}>
                    <IoIosAdd size="80px" color="rgba(206, 210, 210, 0.65)" />
                </div>
                <div className='mealImage' style={{ backgroundImage: (meal.image === "") ? `url(${imageNotFound})` : `url(http://localhost:4444${meal.image})` }}></div>
                <div className="mealInfo">
                    <p className="mealTitle">{meal.name}</p>
                    <div className="mealDoc">
                        <div className="mealStats">
                            <p className='title'>Calories</p>
                            <p className='mealNum'>{meal.calories}</p>
                        </div>
                        <div className="mealStats">
                            <p className='title'>Protein</p>
                            <p className='mealNum'>{meal.proteins}</p>
                        </div>
                        <div className="mealStats">
                            <p className='title'>Carbon</p>
                            <p className='mealNum'>{meal.carbohydrates}</p>
                        </div>
                        <div className="mealStats">
                            <p className='title'>Fats</p>
                            <p className='mealNum'>{meal.fats}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));

        const finalResMy = resultsMy.map((meal, index) => (
            <div className="meal" key={index}>
                <div className="mealOnHover" onClick={() => { setDishModalInfo(meal); setAddDishModalOpen(true) }}>
                    <IoIosAdd size="80px" color="rgba(206, 210, 210, 0.65)" />
                </div>
                <div className='mealImage' style={{ backgroundImage: (meal.image === "") ? `url(${imageNotFound})` : `url(http://localhost:4444${meal.image})` }}></div>
                <div className="mealInfo">
                    <p className="mealTitle">{meal.name}</p>
                    <div className="mealDoc">
                        <div className="mealStats">
                            <p className='title'>Calories</p>
                            <p className='mealNum'>{meal.calories}</p>
                        </div>
                        <div className="mealStats">
                            <p className='title'>Protein</p>
                            <p className='mealNum'>{meal.proteins}</p>
                        </div>
                        <div className="mealStats">
                            <p className='title'>Carbon</p>
                            <p className='mealNum'>{meal.carbohydrates}</p>
                        </div>
                        <div className="mealStats">
                            <p className='title'>Fats</p>
                            <p className='mealNum'>{meal.fats}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
        setRenderMeals(finalRes.slice(0, 4))
        setMyMeals(finalResMy.slice(0, 4))
    }

    return (
        <>
            <div className={`dishModal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
                <div className="dishModal__content" onClick={(e) => { e.stopPropagation() }}>
                    <div className="mealsChooseContainer">
                        <div className="myOrPublic">
                            <div className={(mealMode === 1) ? 'choiceActive' : 'choice'} onClick={() => { setMealMode(1) }}><p className="textChoice">My meals</p><FaHome size="16px" className="icon" /></div>
                            <div className={(mealMode === 2) ? 'choiceActive' : 'choice'} onClick={() => { setMealMode(2) }}><p className="textChoice">Public Meals</p><MdOutlinePublic size="16px" className="icon" /></div>
                            <div className={(mealMode === 3) ? 'choiceActive' : 'choice'} onClick={() => { setMealMode(3) }}><p className="textChoice">Create Meal</p><IoIosCreate size="16px" className="icon" /></div>
                        </div>
                        <input onChange={handleSearch} type="text" className="searchBar" style={{ display: (mealMode === 3) ? 'none' : 'flex' }} placeholder="Поиск..." />
                        <div className="myMeals" style={{ display: (mealMode === 1) ? 'flex' : 'none' }}>
                            {myMeals}
                        </div>
                        <div className="publicMeals" style={{ display: (mealMode === 2) ? 'flex' : 'none' }}>
                            {renderMeals}
                        </div>
                        <div className="createForm" style={{ display: (mealMode === 3) ? 'flex' : 'none' }}>
                            <CreateDish />
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
                        severity="error"
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
            <AddDishModal active={addDishModalOpen} setActive={setAddDishModalOpen} dataMeal={dishModalInfo} />
        </>
    );
}

export default DishModal;
