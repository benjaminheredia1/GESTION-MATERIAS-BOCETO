import React from 'react';
import './FailedCourseAlert.css';

const FailedCourseAlert = ({ course, isOpen, onClose, onRetry }) => {
    if (!isOpen || !course) return null;

    const handleRetry = () => {
        onRetry(course);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="failed-alert-modal" onClick={e => e.stopPropagation()}>
                <div className="alert-header">
                    <div className="alert-icon">⚠️</div>
                    <h2>Materia Reprobada</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="alert-body">
                    <div className="course-info">
                        <h3>{course.name}</h3>
                        <p className="course-code">{course.id}</p>
                        <span className={`course-type-badge ${course.type}`}>
                            {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                        </span>
                    </div>
                    
                    <div className="alert-message">
                        <p>
                            <strong>Lo sentimos,</strong> no has aprobado esta materia. 
                            Deberás cursarla nuevamente en el próximo período académico disponible.
                        </p>
                        
                        <div className="consequences">
                            <h4>Consideraciones importantes:</h4>
                            <ul>
                                <li>Esta materia quedará marcada como reprobada en tu expediente</li>
                                <li>Deberás inscribirla nuevamente cuando esté disponible</li>
                                <li>Podrías tener restricciones para cursar materias que la requieren como prerrequisito</li>
                                <li>Consulta con tu asesor académico sobre las próximas acciones</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="alert-footer">
                    <button className="btn-understand" onClick={onClose}>
                        Entendido
                    </button>
                    <button className="btn-retry" onClick={handleRetry}>
                        Programar para Repetir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FailedCourseAlert;
