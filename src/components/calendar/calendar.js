import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import { fetchDeleteTask } from '../../redux/slices/task';

import { FaCirclePlus, FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import CreateModal from './calendarTools/createTask';
import Task from './task';
import Stats from './statsHealth';
import axios from '../../axios';

import './calendar.scss';
import 'react-circular-progressbar/dist/styles.css';
import '../../Adapt.scss';



const Calendar = () => {
    const [week, setWeek] = useState([]);
    const [weekMobile, setWeekMobile] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState([]);
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
        const todayDay = (date.getDay() + 6) % 7;
        startOfWeek.setDate(startOfWeek.getDate() - todayDay + (currentWeekIndex));

        for (let i = 0; i < 7; i++) {
            const dateI = new Date(startOfWeek);
            dateI.setDate(startOfWeek.getDate() + i);
            const currentDate = new Date(dateI.getFullYear(), dateI.getMonth(), dateI.getDate());
            weekData.push(getInfo(dateI, currentDate.getTime() === todayDate.getTime()));
        }

        setWeek(weekData);
    };

    const goToPreviousWeek = (index) => {
        setCurrentWeekIndex(prevIndex => prevIndex - index);
    };

    const goToNextWeek = (index) => {
        setCurrentWeekIndex(prevIndex => prevIndex + index);
    };

    const dateForMobile = (today) => {
        const weekDataMobile = [];

        const dateToday = new Date();
        const dateCenter = new Date(dateToday);
        dateCenter.setDate(dateCenter.getDate() + (currentWeekIndex));
        const datePrew = new Date(dateCenter); // Create a copy of dateToday for the previous day
        datePrew.setDate(dateCenter.getDate() - 1); // Set it to the previous day
        const dateNext = new Date(dateCenter); // Create a copy of dateToday for the next day
        dateNext.setDate(dateCenter.getDate() + 1); // Set it to the next day

        weekDataMobile.unshift(getInfo(datePrew, false)); // Add the previous day info to the beginning of the array
        weekDataMobile.push(getInfo(dateCenter, dateCenter.getTime() === dateToday.getTime())); // Add today's info to the end of the array
        weekDataMobile.push(getInfo(dateNext, false)); // Add the next day info to the end of the array

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
            const tasks = await axios.get('/tasks');
            const stats = await axios.get('/stats');
            setTasks(tasks.data);
            setStats(stats.data);
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

        const sameDay = dt1.getDate() === dt2.getDate();
        const sameMonth = dt1.getMonth() === dt2.getMonth();
        const sameYear = dt1.getFullYear() === dt2.getFullYear();

        return sameDay && sameMonth && sameYear;
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

    const statsForDay = (day) => {
        let todayStats = stats.filter(task => task.user?._id === userData?.userData?._id);
        let matchedStats = todayStats.find(statsDB => {
            let date = new Date(statsDB.day);
            return compareDates(day, date);
        });

        if (matchedStats) {
            return <Stats key={matchedStats._id} stats={matchedStats} />;
        } else {
            const defaultValuesStats = {
                day: day,
                calories: 0,
                water: 0,
                weight: 0,
                activity: 0
            };
            return <Stats key="default" stats={defaultValuesStats} />;
        }
    };



    useEffect(() => {
        if (isAuth && loading) {
            fetchData();
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
                                <div className='dayText'>{day}</div>
                            </p>
                            <p>
                                {`${week[index].number}.${(week[index].month + 1).toString().padStart(2, '0')}`}
                            </p>
                        </div>
                    )}
                    {week[index] && statsForDay(`${week[index].year}-${monthNames[week[index].month + 1]}-${numberNames[week[index].number]}`)}
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
                                <div className='dayText'>{daysNames[dayData.day]}</div>
                            </p>
                            <p>
                                {`${numberNames[dayData.number]}.${(dayData.month + 1).toString().padStart(2, '0')}`}
                            </p>
                        </div>
                    )}
                    {dayData && statsForDay(`${dayData.year}-${monthNames[dayData.month + 1]}-${numberNames[dayData.number]}`)}
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
                <div className="switchWeeksPhone">
                    <button onClick={() => goToPreviousWeek(3)}><FaAngleLeft size="20px" style={{ backgroundColor: 'white' }} /></button>
                    <h4>{`${week[0].number}.${(week[0].month + 1).toString().padStart(2, '0')}`}-{week[6].number}.{(week[6].month + 1).toString().padStart(2, '0')}</h4>
                    <button onClick={() => goToNextWeek(3)}><FaAngleRight size="20px" style={{ backgroundColor: 'white' }} /></button>
                </div>
                <div className="switchWeeks">
                    <button onClick={() => goToPreviousWeek(7)}><FaAngleLeft size="20px" style={{ backgroundColor: 'white' }} /></button>
                    <h4>{`${week[0].number}.${(week[0].month + 1).toString().padStart(2, '0')}`}-{week[6].number}.{(week[6].month + 1).toString().padStart(2, '0')}</h4>
                    <button onClick={() => goToNextWeek(7)}><FaAngleRight size="20px" style={{ backgroundColor: 'white' }} /></button>
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