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

const CreateTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            title: "",
            text: "",
        },
        mode: 'all'
    })

    const refreshPage = () => {
        return navigate("/")
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const onSubmit = async (params) => {
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
                    <TextField className={styles.field}
                        fullWidth
                        type="date"
                        error={Boolean(errors.finalDate?.message)}
                        helperText={errors.finalDate?.message}
                        {...register('finalDate', { required: 'Укажите дату' })}
                    />
                    <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                        Создать
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