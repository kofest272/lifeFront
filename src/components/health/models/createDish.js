import { useDispatch } from "react-redux";
import { useState, React } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./style.scss";
import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "../../../axios";

const CreateDish = () => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [caloriesValue, setCaloriesValue] = useState(0);
    const [fatsValue, setFatsValue] = useState(0);
    const [carbohydratesValue, setCarbohydratesValue] = useState(0);
    const [proteinValue, setProteinValue] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    const min = 0;
    const max = 1000;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        mode: 'all'
    })

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChangeInput = (event, field) => {
        let value = event.target.value;
        if (value === '0') {
            value = '';
        } else {
            value = Math.max(min, Math.min(max, Number(value)));
        }
        switch (field) {
            case 'calories':
                setCaloriesValue(value);
                break;
            case 'fats':
                setFatsValue(value);
                break;
            case 'carbohydrates':
                setCarbohydratesValue(value);
                break;
            case 'protein':
                setProteinValue(value);
                break;
            default:
                break;
        }
    };

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0]; // исправлено с event.target.files(0)
            formData.append('image', file)
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url)
        } catch (error) {
            setSnackbarMessage('Ошибка при загрузке фото: ' + error.message); // добавлена дополнительная информация об ошибке
            setSnackbarOpen(true);
        }
    }

    const onSubmit = async (params) => {
        try {
            let field = {
                name: params.title,
                calories: params.calories,
                fats: params.fats,
                proteins: params.proteins,
                carbohydrates: params.carbohydrates,
                image: imageUrl
            };
            const { data } = await axios.post('/meals', field);
        } catch (error) {
            setSnackbarMessage('Ошибка при создании мила');
            setSnackbarOpen(true);
        } finally {
            navigate(0)
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

    return (
        <>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        className={styles.field}
                        label="Title"
                        error={Boolean(errors.title?.message)}
                        helperText={errors.title?.message}
                        {...register('title', { required: 'Specify the title' })}
                        type="text"
                        fullWidth
                    />
                    <input type="file" onChange={handleChangeFile} />
                    <TextField
                        className={styles.field}
                        label="Calories (100g)"
                        error={Boolean(errors.calories?.message)}
                        helperText={errors.calories?.message}
                        {...register('calories', { required: 'Specify calories' })}
                        type="number"
                        value={caloriesValue}
                        onChange={(e) => handleChangeInput(e, 'calories')}
                        fullWidth
                    />

                    <TextField
                        className={styles.field}
                        label="Fats (100g)"
                        error={Boolean(errors.fats?.message)}
                        helperText={errors.fats?.message}
                        {...register('fats', { required: 'Specify fats' })}
                        type="number"
                        value={fatsValue}
                        onChange={(e) => handleChangeInput(e, 'fats')}
                        fullWidth
                    />

                    <TextField
                        className={styles.field}
                        label="Carbohydrates (100g)"
                        error={Boolean(errors.carbohydrates?.message)}
                        helperText={errors.carbohydrates?.message}
                        {...register('carbohydrates', { required: 'Specify carbohydrates' })}
                        type="number"
                        value={carbohydratesValue}
                        onChange={(e) => handleChangeInput(e, 'carbohydrates')}
                        fullWidth
                    />

                    <TextField
                        className={styles.field}
                        label="Protein (100g)"
                        error={Boolean(errors.fats?.message)}
                        helperText={errors.fats?.message}
                        {...register('proteins', { required: 'Specify protein' })}
                        type="number"
                        value={proteinValue}
                        onChange={(e) => handleChangeInput(e, 'protein')}
                        fullWidth
                    />
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

export default CreateDish;