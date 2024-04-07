import React from "react";
import '../../modal.css';
import CreateTask from "../../forms/createTaskForm";

const CreateModal = ({ active, setActive }) => {
    return (
        <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
            <div className="modal__content" style={{ width: '500px', height: '600px' }} onClick={(e) => { e.stopPropagation() }}>
                <CreateTask />
            </div>
        </div>
    );
}

export default CreateModal;