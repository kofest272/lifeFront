import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const RegistrationForm = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            fullName: 'Denis Goptsii',
            email: 'denis.goptsii@gmail.com',
            password: '2024'
        },
        mode: 'all'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            return alert('Не удалось зарегистрироваться')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to="/" />
    }
    return (
        <div className="containerToCenter">
            <Paper className="root">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography classes={{ root: styles.titleForm }} variant="h5">
                        Создание аккаунта
                    </Typography>
                    <div className="avatar">
                        <Avatar sx={{ width: 100, height: 100 }} />
                    </div>
                    <TextField
                        error={Boolean(errors.fullName?.message)}
                        helperText={errors.fullName?.message}
                        {...register('fullName', { required: 'Укажите имя' })}
                        className={styles.field}
                        label="Полное имя" fullWidth />
                    <TextField
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        type="email"
                        {...register('email', { required: 'Укажите email' })}
                        className={styles.field}
                        label="E-Mail" fullWidth />
                    <TextField
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'Укажите пароль' })}
                        className={styles.field}
                        label="Пароль" fullWidth />
                    <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                        Зарегистрироваться
                    </Button>
                    <p>Уже есть аккаунт? <Link to="/login">Авторизоваться</Link></p>
                </form>
            </Paper>
        </div>

    );
};

export default RegistrationForm;