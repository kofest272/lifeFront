import './health.css';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { fetchOneStats, fetchAddStats } from '../../redux/slices/stats';
import { fetchOneMeals } from '../../redux/slices/meals'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import axios from '../../axios';

import { FaWeightScale } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineWaterDrop, MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

import './health.css'
import DishModal from './models/chooseDish';
import imageNotFound from './notFound.png'

const Health = () => {
    const params = useParams();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dishModal, setDishModal] = useState(false);
    const [renderMeals, setRenderMeals] = useState([]);
    const userId = useSelector((state) => state.auth);
    const variable = params.date.slice(3)

    const fetchData = async () => {
        try {
            let res = await dispatch(fetchOneStats(variable));
            let result = null; // Declare result outside the loop

            if (!res.error) {
                for (let i = 0; i < res.payload.length; i++) {
                    if (res.payload[i].user === userId.data.userData._id) {
                        result = res.payload[i]; // Assign value to result
                        break; // Assuming you only need to find the first match, you can break the loop once found
                    }
                }

                setStats(result); // Now result is accessible here
                fetchAllMeals(result);
            } else {
                const defaultParams = {
                    day: variable,
                    calories: 0,
                    water: 0,
                    weight: 0,
                    activity: 0
                }
                const data = await dispatch(fetchAddStats(defaultParams));

                if (!data.payload) {
                    setSnackbarMessage('Ошибка при создании статистики');
                    setSnackbarOpen(true);
                } else {
                    refreshPage()
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Ошибка при загрузке данных');
            setSnackbarOpen(true);
        }
    };

    const deleteMeal = async (data) => {
        try {
            const calories = data.calories;
            const id = data.id;
            const response = await axios.delete(`/stats/removeMeal/${variable}/${id}`, {
                data: { calories }
            });
            if (response.data.success === false) {
                setSnackbarMessage('Ошибка при удалении пищи');
                setSnackbarOpen(true);
            } else {
                setRenderMeals(prevRenderMeals => prevRenderMeals.filter(meal => meal.key !== data.id));

                const updatedStats = await dispatch(fetchOneStats(variable));
                const updatedResult = updatedStats.payload.find(item => item.user === userId.data.userData._id);
                setStats(updatedResult);

                fetchAllMeals(updatedResult);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Ошибка при удалении пищи');
            setSnackbarOpen(true);
        }
    }

    const fetchAllMeals = async (data) => {
        try {
            const res = await Promise.all(data.meals.map(async (mealData, index) => {
                const resec = await dispatch(fetchOneMeals(mealData.dish));
                const meal = (resec.payload);
                const quantity = (mealData.quantity);
                const dataDDD = {
                    calories: Math.floor(meal.calories / 100 * quantity),
                    id: meal._id
                }
                return (
                    <>
                        <div className="meal" key={index}>
                            <div className='mealImage' style={{ backgroundImage: (meal.image === "") ? `url(${imageNotFound})` : `url(http://localhost:4444${meal.image})` }}></div>
                            <div className="mealInfo">
                                <p className="mealTitle">{meal.name} ({quantity}g)</p>
                                <div className="mealDoc">
                                    <div className="mealStats">
                                        <p className='title'>Calories</p>
                                        <p className='mealNum'>{Math.floor(meal.calories / 100 * quantity)}</p>
                                    </div>
                                    <div className="mealStats">
                                        <p className='title'>Protein</p>
                                        <p className='mealNum'>{Math.floor(meal.proteins / 100 * quantity)}</p>
                                    </div>
                                    <div className="mealStats">
                                        <p className='title'>Carbon</p>
                                        <p className='mealNum'>{Math.floor(meal.carbohydrates / 100 * quantity)}</p>
                                    </div>
                                    <div className="mealStats">
                                        <p className='title'>Fats</p>
                                        <p className='mealNum'>{Math.floor(meal.fats / 100 * quantity)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mealDelete" onClick={() => { deleteMeal(dataDDD) }}>
                                <MdDeleteOutline />
                            </div>
                        </div>
                    </>
                );
            }));
            setRenderMeals(res);
        } catch (error) {
            console.error('Error fetching data fetchAllMeals:', error);
        } finally {
            setLoading(false);
        }
    }

    const refreshPage = () => {
        return navigate("/")
    }

    useEffect(() => {
        if (isAuth && loading) {
            fetchData();
        }
    }, [isAuth]);

    const loadingOr = () => {
        if (loading) {
            return <div className="loaderDivMeal"><div className="loader"></div></div>
        } else {
            return renderMeals;
        }
    }

    return (
        <div className="toCenter">
            <div className="containerHealth">
                <div className="statsDiv">
                    <div className="mealsList">
                        {loadingOr()}
                        <div className="mealAdd" onClick={() => { setDishModal(true) }}>
                            <IoIosAdd size="80px" color="rgba(206, 210, 210, 0.65)" />
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="circle">
                            <CircularProgressbarWithChildren value={(stats.calories / 3017) * 100} styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                textColor: '#f88',
                                pathColor: '#FFC55A',
                                trailColor: '#444444',
                                backgroundColor: '#3e98c7',
                            })}>
                                <IoFastFoodOutline size={'60px'} color="white" />
                            </CircularProgressbarWithChildren>
                        </div>
                        <div className="infoStats">
                            <p>{stats.calories}</p>
                            <p className='bold'>3017</p>
                        </div>
                    </div>
                </div>
                <div className="tripleStats">
                    <div className="rightContainer">
                        <div className="circle">
                            <CircularProgressbarWithChildren value={(stats.activity / 700) * 100} styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                textColor: '#f88',
                                pathColor: '#ff5656',
                                trailColor: '#444444',
                                backgroundColor: '#3e98c7',
                            })}>
                                <FaRunning size={'60px'} color="white" />
                            </CircularProgressbarWithChildren>
                        </div>
                        <div className="infoStats">
                            <p>{stats.activity}</p>
                            <p className='bold'>700</p>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="circle">
                            <CircularProgressbarWithChildren value={(stats.water / 2400) * 100} styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                textColor: '#f88',
                                pathColor: '#2495ff',
                                trailColor: '#444444',
                                backgroundColor: '#3e98c7',
                            })}>
                                <MdOutlineWaterDrop size={'60px'} color="white" />
                            </CircularProgressbarWithChildren>
                        </div>
                        <div className="infoStats">
                            <p>{stats.water}</p>
                            <p className='bold'>2400</p>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="circle">
                            <CircularProgressbarWithChildren value={(stats.weight / 80) * 100} styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                textColor: '#f88',
                                pathColor: '#008a1e',
                                trailColor: '#444444',
                                backgroundColor: '#3e98c7',
                            })}>
                                <FaWeightScale size={'60px'} color="white" />
                            </CircularProgressbarWithChildren>
                        </div>
                        <div className="infoStats">
                            <p>{stats.weight}</p>
                            <p className='bold'>80</p>
                        </div>
                    </div>
                </div>
            </div>

            <DishModal active={dishModal} setActive={setDishModal} />
        </div >

    )
}

export default Health;
