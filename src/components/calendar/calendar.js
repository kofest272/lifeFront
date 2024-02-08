import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMove } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";

import EditModal from './calendarTools/editTask';
import CreateModal from './calendarTools/createTask';

import './calendar.css';
import '../../Adapt.scss';

import axios from '../../axios';
import { fetchDeleteTask } from '../../redux/slices/task';

const Calendar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const [week, setWeek] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [loading, setLoading] = useState(true);  // Добавлено состояние loading
    const userData = useSelector((state) => state.auth.data);

    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        if (isAuth) {
            getWeek();
        }
    }, [isAuth]);

    const deleteTask = (id) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            dispatch(fetchDeleteTask(id))
            refreshPage()
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const getInfo = (today, active) => ({
        day: (today.getDay() + 6) % 7,
        year: today.getFullYear(),
        month: today.getMonth(),
        number: today.getDate(),
        active: active,
        date: today
    });

    const daysNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Субота', 'Воскресенье'];
    const numberNames = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
        '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const monthNames = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const getWeek = () => {
        const weekData = [];
        const date = new Date();
        const todayDay = (date.getDay() + 6) % 7;

        for (let i = 0; i < 7; i++) {
            const offset = i - todayDay;
            const dateI = new Date(date);
            dateI.setDate(date.getDate() + offset);
            weekData.push(getInfo(dateI, offset === 0));
        }

        setWeek(weekData);
    };

    const checkTask = (day) => {
        try {
            let availableTasks = [];
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].user._id) {
                    if (tasks[i].user._id === userData.userData._id) {
                        availableTasks.push(tasks[i]);
                    }
                } else {
                    continue;
                }
            }
            return tasksForDay(day, availableTasks);
        } catch (error) {
            setSnackbarMessage(error.message || 'Что-то пошло не так :(');
            setSnackbarOpen(true);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Ошибка при загрузке данных');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    function compareDates(date1, date2) {
        const dt1 = new Date(date1);
        const dt2 = new Date(date2);

        return dt1.getTime() === dt2.getTime();
    }

    const tasksForDay = (day, tasks) => {
        const taskElements = [];
        for (let i = 0; i < tasks.length; i++) {
            let date = new Date(tasks[i].finalDate);
            if (compareDates(day, date)) {
                const data = tasks[i];
                taskElements.push(
                    <div key={i} className="task">
                        <div className="colorTask" style={{ backgroundColor: `${data.color}` }}></div>
                        <div className="info">
                            <p className='titleTask'>{data.title}</p>
                            <p className='subTask'>{data.text}</p>
                        </div>
                        <div className="tools">
                            <div className="delete" onClick={() => deleteTask(data._id)}><AiOutlineDelete color="white" /></div>
                            <div className="move"><IoMdMove color="white" /></div>
                            <div className="edit" onClick={() => setModalEditActive(true)}><MdModeEdit color="white" /></div>
                            <EditModal active={modalEditActive} setActive={setModalEditActive} id={data._id} defaultValues={data} />
                        </div>
                    </div>
                );
            }
        }
        return taskElements;
    };

    useEffect(() => {
        if (!loading) {
            fetchData();
        }
    }, [loading]);

    useEffect(() => {
        if (isAuth) {
            getWeek();
            fetchData(); // Вызовите fetchData при изменении isAuth
        }
    }, [isAuth]);

    if (loading) {
        return <div className="loaderDiv"><div class="loader"></div></div>
    }

    return (
        <div className="contCenter">
            <div className="cornerDiv">
                <button className='clearBtn' onClick={() => setModalCreateActive(true)}>
                    <FaCirclePlus size="50px" />
                </button>
            </div>
            <div className="calendarContainer">
                {daysNames.map((day, index) => (
                    <div key={index} className="day-of-week">
                        {week[index] && (
                            <div className={week[index].active ? 'dayInfo activeDay' : 'dayInfo'}>
                                <p>
                                    <strong>{day}</strong>
                                </p>
                                <p>
                                    {`${week[index].number}.${(week[index].month + 1).toString().padStart(2, '0')}`}
                                </p>
                            </div>
                        )}
                        {week[index] && checkTask(`${week[index].year}-${monthNames[week[index].month + 1]}-${numberNames[week[index].number]}`)}
                    </div>
                ))}
            </div>
            <CreateModal active={modalCreateActive} setActive={setModalCreateActive} />

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
        </div>
    );
};

export default Calendar;
