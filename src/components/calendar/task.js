import React, { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMove } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import EditModal from './calendarTools/editTask';

const Task = ({ task, onDelete, onEdit }) => {
    const [modalEditActive, setModalEditActive] = useState(false);

    const handleEditClick = () => {
        onEdit(); // Вызываем колбэк-функцию, переданную из родительского компонента
        setModalEditActive(true); // Открываем модальное окно редактирования для этой задачи
    };

    return (
        <div className="task">
            <div className="colorTask" style={{ backgroundColor: `${task.color}` }}></div>
            <div className="info">
                <p className='titleTask'>{task.title}</p>
                <p className='subTask'>{task.text}</p>
            </div>
            <div className="tools">
                <div className="delete" onClick={() => onDelete(task._id)}><AiOutlineDelete color="white" /></div>
                <div className="move"><IoMdMove color="white" /></div>
                <div className="edit" onClick={handleEditClick}><MdModeEdit color="white" /></div>
                <EditModal active={modalEditActive} setActive={setModalEditActive} id={task._id} defaultValues={task} />
            </div>
        </div>
    );
};

export default Task;
