// src/components/Header.js
import React from 'react';

// Recibimos la prop 'student' que contiene los datos
const Header = ({ student }) => {
    return (
        <header className="main-header">
            {/* El logo se mantiene igual */}
            <div className="logo-container">
                <div className="logo-placeholder">UTEPSA</div>
                <div className="university-name">
                    UNIVERSIDAD TECNOLÓGICA<br />
                    PRIVADA DE SANTA CRUZ
                </div>
            </div>

            {/* Título de la carrera (lo mantenemos simple) */}
            <div className="header-career-title">
                <h1 className="major-title-text"></h1>
            </div>

            {/* NUEVO: Contenedor con la información del estudiante */}
            <div className="student-info-container">
                <div className="student-name">{student.name}</div>
                <div className="student-details">
                    <span>REGISTRRO: <strong>{student.code}</strong></span>
                    <span>AVANCE: <strong>{student.progress}%</strong></span>
                    <span>PROMEDIO: <strong>{student.ppa.toFixed(2)}</strong></span>
                </div>
            </div>
        </header>
    );
};

export default Header;