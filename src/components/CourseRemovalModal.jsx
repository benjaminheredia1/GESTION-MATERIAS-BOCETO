import React from 'react';
import './CourseRemovalModal.css';

const CourseRemovalModal = ({ enrolledCourse, isOpen, onClose, onRemove }) => {
    if (!isOpen || !enrolledCourse) return null;

    const handleRemove = () => {
        onRemove(enrolledCourse);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="removal-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Eliminar Materia Inscrita</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-body">
                    <div className="warning-icon">⚠️</div>
                    <div className="course-info">
                        <h3>{enrolledCourse.course.name}</h3>
                        <p className="course-code">{enrolledCourse.course.id}</p>
                        <div className="schedule-info">
                            <span className="schedule-time">{enrolledCourse.schedule.time}</span>
                            <span className="schedule-label">{enrolledCourse.schedule.label}</span>
                        </div>
                    </div>
                    
                    <p className="warning-text">
                        ¿Estás seguro que deseas eliminar esta materia de tu inscripción? 
                        Esta acción no se puede deshacer.
                    </p>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-remove" onClick={handleRemove}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseRemovalModal;
