import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { fetchDeleteTask } from '../../redux/slices/task';
import Task from './task';

import { FaCirclePlus, FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import CreateModal from './calendarTools/createTask';

import './calendar.css';
import '../../Adapt.scss';



const Calendar = () => {
    const [week, setWeek] = useState([]);
    const [weekMobile, setWeekMobile] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

    const { data: userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    const refreshPage = () => {
        return navigate("/")
    }

    useEffect(() => {
        if (isAuth) {
            getWeek();
        } else {
            return navigate("/reg")
        }
    }, [isAuth]);

    const deleteTask = (id) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            dispatch(fetchDeleteTask(id)).then(() => {
                refreshPage();
            });
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
        const todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Текущая дата без времени
        const startOfWeek = new Date(date);
        const todayDay = (date.getDay() + 6) % 7; // Корректируем индекс дня недели, чтобы воскресенье было 0
        startOfWeek.setDate(startOfWeek.getDate() - todayDay + (currentWeekIndex * 7)); // Учитываем текущий день недели и номер недели

        for (let i = 0; i < 7; i++) {
            const dateI = new Date(startOfWeek);
            dateI.setDate(startOfWeek.getDate() + i);
            const currentDate = new Date(dateI.getFullYear(), dateI.getMonth(), dateI.getDate());
            weekData.push(getInfo(dateI, currentDate.getTime() === todayDate.getTime()));
        }

        setWeek(weekData);
    };

    const goToPreviousWeek = () => {
        setCurrentWeekIndex(prevIndex => prevIndex - 1);
    };

    const goToNextWeek = () => {
        setCurrentWeekIndex(prevIndex => prevIndex + 1);
    };

    const dateForMobile = (today) => {
        const weekDataMobile = [];
        const date = new Date();
        const todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Текущая дата без времени
        const startOfWeek = new Date(date);
        const todayDay = (date.getDay() + 6) % 7; // Корректируем индекс дня недели, чтобы воскресенье было 0
        startOfWeek.setDate(startOfWeek.getDate() - todayDay + (currentWeekIndex * 7)); // Учитываем текущий день недели и номер недели

        for (let i = 0; i < 3; i++) {
            const dateI = new Date(startOfWeek);
            dateI.setDate(startOfWeek.getDate() + i);
            const currentDate = new Date(dateI.getFullYear(), dateI.getMonth(), dateI.getDate());
            weekDataMobile.push(getInfo(dateI, currentDate.getTime() === todayDate.getTime()));
        }

        setWeekMobile(weekDataMobile);
    };

    const checkTask = (day) => {
        try {
            let availableTasks = tasks.filter(task => task.user?._id === userData?.userData?._id);
            return tasksForDay(day, availableTasks);
        } catch (error) {
            setSnackbarMessage(error.message || 'Что-то пошло не так :(');
            setSnackbarOpen(true);
            return null;
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
        return tasks.map((task, index) => {
            let date = new Date(task.finalDate);
            if (compareDates(day, date)) {
                return (
                    <Task
                        key={index}
                        task={task}
                        onDelete={deleteTask}
                        onEdit={() => setModalEditActive(index)}
                    />
                );
            }
        });
    };

    useEffect(() => {
        if (isAuth && loading) {
            fetchData(); // Получаем данные только если пользователь аутентифицирован и данные еще не загружены
        }
    }, [isAuth, loading]);

    useEffect(() => {
        if (isAuth) {
            getWeek();
            dateForMobile();
        } else {
            navigate("/reg");
        }
    }, [isAuth, currentWeekIndex]);

    if (loading) {
        return <div className="loaderDiv"><div className="loader"></div></div>
    }

    const calendarItems = () => {
        return (
            daysNames.map((day, index) => (
                <div key={index} className={week[index].active ? 'day-of-week today' : 'day-of-week'}>
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
            ))
        )
    }

    const calendarItemsPhone = () => {
        let items = [];
        for (let i = 0; i < 3; i++) {
            const dayData = weekMobile[i];

            items.push(
                <div key={i} className='day-of-week'>
                    {dayData && (
                        <div className={dayData.active ? 'dayInfo activeDay' : 'dayInfo'}>
                            <p>
                                <strong>{daysNames[dayData.day]}</strong> {/* Use dayData.day to access day index */}
                            </p>
                            <p>
                                {`${numberNames[dayData.number]}.${(dayData.month + 1).toString().padStart(2, '0')}`}
                            </p>
                        </div>
                    )}
                    {dayData && checkTask(`${dayData.year}-${monthNames[dayData.month + 1]}-${numberNames[dayData.number]}`)}
                </div>
            );
        }

        return items;
    }

    return (
        <div className="contCenter">
            <div className="cornerDiv">
                <button className='clearBtn' onClick={() => setModalCreateActive(true)}>
                    <FaCirclePlus size="50px" />
                </button>
            </div>
            <div className="calendarAll">
                <div className="switchWeeks">
                    <button onClick={goToPreviousWeek}><FaAngleLeft size="20px" style={{ backgroundColor: 'white' }} /></button>
                    <h4>{`${week[0].number}.${(week[0].month + 1).toString().padStart(2, '0')}`}-{week[6].number}.{(week[6].month + 1).toString().padStart(2, '0')}</h4>
                    <button onClick={goToNextWeek}><FaAngleRight size="20px" style={{ backgroundColor: 'white' }} /></button>
                </div>
                <div className="calendarContainer">
                    {calendarItems()}
                </div>
                <div className="calendarContainerPhone">
                    {calendarItemsPhone()}
                </div>
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
