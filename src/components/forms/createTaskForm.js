import { useDispatch } from "react-redux";
import { useState, React } from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./style.scss";
import { fetchAddTask } from "../../redux/slices/task";
import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CreateTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        setValue,
        watch
    } = useForm({
        defaultValues: {
            title: "",
            text: "",
            dailyTask: false,
        },
        mode: 'all'
    })

    const refreshPage = () => {
        return navigate("/")
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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

    const onSubmit = async (params) => {
        if (params.dailyTask) {
            params.dailyDays = selectedDays;
            params.finalDate = "2001-01-01";
            params.daily = true;
        } else {
            params.dailyDays = [];
            params.daily = false;
        }

        const data = await dispatch(fetchAddTask(params));

        if (!data.payload) {
            setSnackbarMessage('Ошибка при создании задания');
            setSnackbarOpen(true);
        } else {
            refreshPage()
        }
    }

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

    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography classes={{ root: styles.titleForm }} variant="h5">
                    Создать задание
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        className={styles.field}
                        label="Название задания"
                        error={Boolean(errors.title?.message)}
                        helperText={errors.title?.message}
                        {...register('title', { required: 'Укажите текст' })}
                        type="text"
                        fullWidth
                    />
                    <TextField className={styles.field}
                        label="Описание задания"
                        fullWidth
                        error={Boolean(errors.text?.message)}
                        helperText={errors.text?.message}
                        type="text"
                        {...register('text', { required: 'Укажите текст' })}
                    />
                    <TextField className={styles.field}
                        label="Цвет"
                        fullWidth
                        error={Boolean(errors.color?.message)}
                        helperText={errors.color?.message}
                        type="color"
                        {...register('color', { required: 'Укажите цвет' })}
                    />
                    <TextField
                        className={styles.field}
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
                        <TextField className={styles.field}
                            fullWidth
                            type="date"
                            error={Boolean(errors.finalDate?.message)}
                            helperText={errors.finalDate?.message}
                            {...register('finalDate', { required: 'Укажите дату' })}
                        />
                    )}

                    <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                        Create
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
                    severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>

    );
};

export const selectIsAuth = (state) => Boolean(state.auth.data)

export default CreateTask;
