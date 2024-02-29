import './health.css';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';
import { fetchOneStats, fetchAddStats } from '../../redux/slices/stats';


const Health = () => {
    const params = useParams();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const fetchData = async () => {
        console.log(params)
        try {
            const res = await dispatch(fetchOneStats(params.date));
            if (res && !res.error) {
                setStats(res);
            } else {
                const defaultParams = {
                    day: params.date,
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
        } finally {
            setLoading(false);
        }
    };

    const refreshPage = () => {
        return navigate("/")
    }

    useEffect(() => {
        if (isAuth && loading) {
            fetchData();
        }
    }, []);

    if (loading) {
        return <div className="loaderDiv"><div className="loader"></div></div>
    }

    return (
        <div className="toCenter">
            <div className="containerHealth">
                <div className="statsDiv"></div>
                <div className="statsDiv"></div>
                <div className="statsDiv"></div>
                <div className="statsDiv"></div>
            </div>
        </div>

    )
}

export default Health;