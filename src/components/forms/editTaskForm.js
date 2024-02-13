import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// @mui
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


import styles from "./style.scss";
import { fetchEditTask } from "../../redux/slices/task";
import { useNavigate } from "react-router-dom";

const EditTask = ({ id, defaultValues }) => {
    const dispatch = useDispatch();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            title: defaultValues.title || '',
            text: defaultValues.text || '',
            color: defaultValues.color || '',
            finalDate: defaultValues.finalDate || '',
        },
        mode: 'all'
    });
    const navigate = useNavigate();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const onSubmit = async (params) => {
        try {
            const data = await dispatch(fetchEditTask({ params, id }));
            if (data.error) {
                throw new Error(`Error: ${data.error.message}`);
            }

            setSnackbarMessage('Task successfully edited');
            setSnackbarOpen(true);
            return navigate("/");
        } catch (error) {
            setSnackbarMessage(error.message || 'Failed to edit task');
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Typography classes={{ root: styles.titleForm }} variant="h5">
                Отредактировать задание
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="title"
                    error={Boolean(errors.title?.message)}
                    helperText={errors.title?.message}
                    {...register('title', { required: 'Укажите текст' })}
                    type="text"
                    fullWidth
                    defaultValue={defaultValues.title ?? ''}
                />
                <TextField
                    className={styles.field}
                    label="text"
                    fullWidth
                    error={Boolean(errors.text?.message)}
                    helperText={errors.text?.message}
                    type="text"
                    {...register('text', { required: 'Укажите текст' })}
                    defaultValue={defaultValues.text ?? ''}
                />
                <TextField
                    className={styles.field}
                    label="color"
                    fullWidth
                    error={Boolean(errors.color?.message)}
                    helperText={errors.color?.message}
                    type="color"
                    {...register('color', { required: 'Укажите цвет' })}
                />
                <TextField
                    className={styles.field}
                    fullWidth
                    error={Boolean(errors.finalDate?.message)}
                    helperText={errors.finalDate?.message}
                    type="date"
                    defaultValue={defaultValues.finalDate.slice(0, 10)}
                    {...register('finalDate', { required: 'Укажите дату' })}
                />
                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Отредактировать
                </Button>
            </form>

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

export default EditTask;
