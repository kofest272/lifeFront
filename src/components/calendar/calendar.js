import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMove } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaCirclePlus, FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import EditModal from './calendarTools/editTask';
import CreateModal from './calendarTools/createTask';

import './calendar.css';
import '../../Adapt.scss';

import axios from '../../axios';
import { fetchDeleteTask } from '../../redux/slices/task';

const Calendar = () => {
    const [week, setWeek] = useState([]);
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
        const todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Текущая дата без времени
        const startOfWeek = new Date(date);
        const todayDay = (date.getDay() + 6) % 7; // Корректируем индекс дня недели, чтобы воскресенье было 0
        startOfWeek.setDate(startOfWeek.getDate() - todayDay + (currentWeekIndex * 7)); // Учитываем текущий день недели и номер недели

        for (let i = 0; i < 7; i++) {
            const dateI = new Date(startOfWeek);
            dateI.setDate(startOfWeek.getDate() + i);
            const currentDate = new Date(dateI.getFullYear(), dateI.getMonth(), dateI.getDate()); // Текущая дата без времени
            weekData.push(getInfo(dateI, currentDate.getTime() === todayDate.getTime())); // Сравнение по точной дате
        }

        setWeek(weekData);
    };




    const goToPreviousWeek = () => {
        setCurrentWeekIndex(prevIndex => prevIndex - 1);
        console.log(week)
    };

    const goToNextWeek = () => {
        setCurrentWeekIndex(prevIndex => prevIndex + 1);
        console.log(week)
    };

    const dateForMobile = () => {
        for (let i = 0; i < week.length; i++) {
            if (week[i].active) {
                break;
            }
            // console.log(i)
        }
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
            dateForMobile();
            fetchData();
        }
    }, [isAuth, currentWeekIndex]);

    if (loading) {
        return <div className="loaderDiv"><div className="loader"></div></div>
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
                    <button onClick={goToPreviousWeek}><FaAngleLeft size="20px" /></button>
                    <h4>{`${week[0].number}.${(week[0].month + 1).toString().padStart(2, '0')}`}-{week[6].number}.{(week[6].month + 1).toString().padStart(2, '0')}</h4>
                    <button onClick={goToNextWeek}><FaAngleRight size="20px" /></button>
                </div>
                <div className="calendarContainer">
                    {daysNames.map((day, index) => (
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
                    ))}
                </div>
                <div className="calendarContainerPhone">
                    {daysNames.map((day, index) => (
                        <div key={index} className={week[index].active ? 'day-of-week today' : 'day-of-week'}>
                            {week[index] && (
                                <div className={week[index].active ? 'dayInfo activeDay' : 'dayInfo'}>
                                    <p>
                                        <strong>{day}</strong>
                                    </p>
                                    <p>
                                        {`${numberNames[week[index].number]}.${(week[index].month + 1).toString().padStart(2, '0')}`}
                                    </p>
                                </div>
                            )}
                            {week[index] && checkTask(`${week[index].year}-${monthNames[week[index].month + 1]}-${numberNames[week[index].number]}`)}
                        </div>
                    ))}
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
