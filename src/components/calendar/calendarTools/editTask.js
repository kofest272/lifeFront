import React from "react";
import './modal.css';
import EditTask from "../../forms/editTaskForm";

const EditModal = ({ active, setActive, id, defaultValues }) => {
    return (
        <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={(e) => { e.stopPropagation() }}>
                <EditTask id={id} defaultValues={defaultValues} />
            </div>
        </div>
    );
}

export default EditModal;
