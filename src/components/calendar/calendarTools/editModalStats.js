import React from "react";
import './modal.css';

const EditModalStats = ({ active, setActive, defaultValues }) => {
    const closeModal = (e) => {
        e.stopPropagation();
        setActive(false);
    };

    return (
        <div className={`modal ${active ? 'active' : ''}`} onClick={closeModal}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <p>Default Values:</p>
                <ul>
                    <li>Calories: {defaultValues.calories}</li>
                    <li>Water: {defaultValues.water}</li>
                    <li>Weight: {defaultValues.weight}</li>
                    <li>Activity: {defaultValues.activity}</li>
                </ul>
                <button>Сохранить</button>
            </div>
        </div>
    );
}

export default EditModalStats;
