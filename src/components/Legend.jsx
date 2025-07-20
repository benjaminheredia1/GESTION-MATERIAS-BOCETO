// src/components/Legend.js
import React from 'react';

const Legend = () => {
    return (
        <div className="legend-container">
            <div className="legend-item">
                <div className="color-box basica"></div>
                <span>Formación Básica</span>
            </div>
            <div className="legend-item">
                <div className="color-box complementaria"></div>
                <span>Formación Complementaria</span>
            </div>
            <div className="legend-item">
                <div className="color-box especialidad"></div>
                <span>Especialidad</span>
            </div>
            <div className="legend-item">
                <div className="color-box electiva"></div>
                <span>Electiva</span>
            </div>
        </div>
    );
};

export default Legend;