import React from 'react';
import './ModeSelectionModal.css';

const ModeSelectionModal = ({ isOpen, onClose, onSelectMode, student }) => {
    if (!isOpen || !student) return null;

    const handleModeSelect = (mode) => {
        onSelectMode(mode);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="mode-selection-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Seleccionar Modo de Vista</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-body">
                    <div className="student-info">
                        <h3>Estudiante: {student.name}</h3>
                        <p>Semestre: {student.semester}</p>
                    </div>

                    <div className="mode-options">
                        <div 
                            className="mode-card visual-mode"
                            onClick={() => handleModeSelect('visual')}
                        >
                            <div className="mode-icon">👁️</div>
                            <h4>Modo Visual</h4>
                            <p>Vista de inscripción de materias con horarios disponibles</p>
                            <ul>
                                <li>Inscribir materias disponibles</li>
                                <li>Ver horarios y profesores</li>
                                <li>Gestión de inscripciones</li>
                            </ul>
                        </div>

                        <div 
                            className="mode-card administrative-mode"
                            onClick={() => handleModeSelect('administrative')}
                        >
                            <div className="mode-icon">📋</div>
                            <h4>Modo Administrativo</h4>
                            <p>Vista del pensum académico con progreso del estudiante</p>
                            <ul>
                                <li>Ver materias aprobadas</li>
                                <li>Ver materias reprobadas</li>
                                <li>Ver materias inscritas</li>
                                <li>Progreso académico completo</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeSelectionModal;
