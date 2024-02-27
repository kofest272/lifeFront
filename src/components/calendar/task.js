import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { SlClose } from "react-icons/sl";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import EditModal from './calendarTools/editTask';
import { fetchToggleCompleteTask } from '../../redux/slices/task';

const Task = ({ task, onDelete, onEdit }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [modalEditActive, setModalEditActive] = useState(false);
    const [isChecked, setIsChecked] = useState(task.completed);
    const dispatch = useDispatch();

    const handleEditClick = () => {
        onEdit();
        setModalEditActive(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const toggleComplete = async () => {
        try {
            const data = await dispatch(fetchToggleCompleteTask({ id: task._id }));
            if (data.error) {
                throw new Error(`Ошибка: ${data.error.message}`);
            }

            setIsChecked(!isChecked);
            setSnackbarMessage('Задание успешно обновлено');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(error.message || 'Произошла ошибка ', error);
            setSnackbarOpen(true);
        }
    }

    return (
        <>
            <div className="task">
                <div className="info">
                    <p className='titleTask' style={{ color: `${task.color}` }}>{task.title}</p>
                    <p className='subTask'>{task.text}</p>
                </div>
                <div className="tools">
                    <div className="delete" onClick={() => onDelete(task._id)}><AiOutlineDelete size="20px" /></div>
                    <div className="toolCheckBox" onClick={() => toggleComplete()}>
                        <svg className={isChecked ? "checkmark active" : "checkmark"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                        <svg className="cross__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{ display: `${isChecked ? "none" : "flex"}` }}>
                            <circle className="cross__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
                            <path className="cross__path cross__path--right" fill="none" d="M16,36 l20,-20" />
                        </svg>
                    </div>
                    <div className="edit" onClick={handleEditClick}><MdModeEdit size="20px" /></div>
                </div>
            </div>
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
            <EditModal active={modalEditActive} setActive={setModalEditActive} id={task._id} defaultValues={task} />
        </>
    );
};

export default Task;
