import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./style.scss";
import { fetchAddTask } from "../../redux/slices/task";

const CreateTask = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            title: "dinis task",
            text: "dinis stask",
        },
        mode: 'all'
    })

    const refreshPage = () => {
        window.location.reload();
    }

    const onSubmit = async (params) => {
        console.log(params)
        const data = await dispatch(fetchAddTask(params));

        if (!data.payload) {
            return alert('Не удалось создать задание')
        }

        alert('Задание успешно создано')

        refreshPage()
    }

    return (
        <>
            <Typography classes={{ root: styles.titleForm }} variant="h5">
                Создать задание
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
                />
                <TextField className={styles.field}
                    label="text"
                    fullWidth
                    error={Boolean(errors.text?.message)}
                    helperText={errors.text?.message}
                    type="text"
                    {...register('text', { required: 'Укажите текст' })}
                />
                <TextField className={styles.field}
                    label="color"
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
                    Войти
                </Button>
            </form>
        </>

    );
};

export const selectIsAuth = (state) => Boolean(state.auth.data)

export default CreateTask;