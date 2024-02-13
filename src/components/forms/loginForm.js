import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { fetchAuth } from "../../redux/slices/auth";

import styles from "./style.scss";

const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'all'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
            window.location.reload();
        }
    }

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <div className="containerToCenter">
            <Paper className="root">
                <Typography classes={{ root: styles.titleForm }} variant="h5">
                    Вход в аккаунт
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        className={styles.field}
                        label="E-Mail"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'Укажите почту' })}
                        type="email"
                        fullWidth
                    />
                    <TextField className={styles.field}
                        label="Пароль"
                        fullWidth
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'Укажите пароль' })}
                    />
                    <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                        Войти
                    </Button>
                    <p>Нету аккаунта? <Link to="/reg">Зарегистрироваться</Link></p>
                </form>
            </Paper >
        </div>

    );
};

export const selectIsAuth = (state) => Boolean(state.auth.data)

export default Login;