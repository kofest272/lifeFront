import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import EditModal from './calendarTools/editTask';
import { fetchToggleCompleteTask } from '../../redux/slices/task';

const Task = ({ task, onDelete, onEdit }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [modalEditActive, setModalEditActive] = useState(false);
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
                <div className="colorTask" style={{ backgroundColor: `${task.color}` }}></div>
                <div className="info">
                    <p className='titleTask'>{task.title}</p>
                    <p className='subTask'>{task.text}</p>
                </div>
                <div className="tools">
                    <div className="delete" onClick={() => onDelete(task._id)}><AiOutlineDelete color="white" /></div>
                    <div className="checkbox-wrapper-7" onClick={toggleComplete}>
                        <input className="tgl tgl-ios" id={`cb2-${task._id}`} type="checkbox" defaultChecked={task.completed} onChange={() => { }} />
                        <label className="tgl-btn" htmlFor={`cb2-${task._id}`} />
                    </div>
                    <div className="edit" onClick={handleEditClick}><MdModeEdit color="white" /></div>
                    <EditModal active={modalEditActive} setActive={setModalEditActive} id={task._id} defaultValues={task} />
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
        </>
    );
};

export default Task;
