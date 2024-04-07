import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styles from "./style.scss";
import MenuItem from "@mui/material/MenuItem";
import { fetchEditTask } from "../../redux/slices/task";
import { useNavigate } from "react-router-dom";

const EditTask = ({ id, defaultValues }) => {
    const dispatch = useDispatch();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm({
        defaultValues: {
            title: defaultValues.title || '',
            text: defaultValues.text || '',
            color: defaultValues.color || '',
            finalDate: defaultValues.finalDate || '',
            dailyTask: defaultValues.dailyTask || false,
        },
        mode: 'all'
    });
    const navigate = useNavigate();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const onSubmit = async (params) => {
        try {
            if (params.dailyTask) {
                params.dailyDays = selectedDays;
                params.finalDate = "2001-01-01";
                params.daily = true;
            } else {
                params.dailyDays = [];
                params.daily = false;
            }
            const data = await dispatch(fetchEditTask({ params, id }));
            if (data.error) {
                throw new Error(`Error: ${data.error.message}`);
            }
            setSnackbarMessage('Задание успешно отредактировано');
            setSnackbarOpen(true);
            return navigate("/");
        } catch (error) {
            setSnackbarMessage(error.message || 'Не удалось отредактировать задание');
            setSnackbarOpen(true);
        }
    };

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#3f51b5',
                light: '#3d4fb7',
                dark: '#3244b1',
            },
            secondary: {
                main: '#6366F1',
            },

        },
        typography: {
            fontFamily: 'Montserrat'
        },
    });

    const dailyTask = watch('dailyTask');

    const handleDailyTaskChange = (value) => {
        setValue('dailyTask', value);
    };

    const handleDayCheckboxChange = (day) => {
        setSelectedDays(prevSelectedDays => {
            if (prevSelectedDays.includes(day)) {
                return prevSelectedDays.filter(selectedDay => selectedDay !== day);
            } else {
                return [...prevSelectedDays, day];
            }
        });
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography variant="h5" classes={{ root: styles.titleForm }}>Отредактировать задание</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Название задания"
                        error={Boolean(errors.title?.message)}
                        helperText={errors.title?.message}
                        {...register('title', { required: 'Укажите текст' })}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        label="Описание задания"
                        fullWidth
                        error={Boolean(errors.text?.message)}
                        helperText={errors.text?.message}
                        type="text"
                        {...register('text', { required: 'Укажите текст' })}
                    />
                    <TextField
                        label="Цвет"
                        fullWidth
                        error={Boolean(errors.color?.message)}
                        helperText={errors.color?.message}
                        type="color"
                        {...register('color', { required: 'Укажите цвет' })}
                    />
                    <TextField
                        fullWidth
                        select
                        label="Тип задания"
                        value={dailyTask}
                        onChange={(e) => handleDailyTaskChange(e.target.value)}
                    >
                        <MenuItem value={false}>Однодневное</MenuItem>
                        <MenuItem value={true}>Ежедневное</MenuItem>
                    </TextField>
                    {dailyTask ? (
                        <div className={styles.daysOfWeek}>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day, index) => (
                                    <div key={day} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <input
                                            type="checkbox"
                                            id={index}
                                            checked={selectedDays.includes(index)}
                                            onChange={() => handleDayCheckboxChange(index)}
                                        />
                                        <label htmlFor={index}>{day}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <TextField
                            fullWidth
                            type="date"
                            error={Boolean(errors.finalDate?.message)}
                            helperText={errors.finalDate?.message}
                            {...register('finalDate', { required: 'Укажите дату' })}
                        />
                    )}

                    <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                        Отредактировать
                    </Button>
                </form>
            </ThemeProvider>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes('успешно') ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditTask;
