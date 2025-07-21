import React, { useState, useEffect } from 'react';
import './EnrollmentReminder.css';

const EnrollmentReminder = ({ enrolledCourses, onRemoveCourse, selectedStudent }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        if (enrolledCourses.length > 0) {
            setIsVisible(true);
        }
    }, [enrolledCourses]);

    const totalCredits = enrolledCourses.reduce((sum, course) => sum + (course.credits || 0), 0);

    const handleClose = () => {
        setIsVisible(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    if (!isVisible || enrolledCourses.length === 0) {
        return null;
    }

    return (
        <div className={`enrollment-reminder ${isMinimized ? 'minimized' : ''}`}>
            <div className="reminder-header">
                <div className="reminder-title">
                    <span className="title-icon">📚</span>
                    <span className="title-text">Materias Seleccionadas</span>
                    <span className="course-count">{enrolledCourses.length}</span>
                </div>
                <div className="reminder-controls">
                    <button 
                        className="minimize-btn"
                        onClick={toggleMinimize}
                        title={isMinimized ? "Expandir" : "Minimizar"}
                    >
                        {isMinimized ? '▲' : '▼'}
                    </button>
                    <button 
                        className="close-btn"
                        onClick={handleClose}
                        title="Cerrar"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <div className="reminder-content">
                    <div className="student-info">
                        <span className="student-name">{selectedStudent?.name}</span>
                        <span className="student-code">ID: {selectedStudent?.id}</span>
                    </div>

                    <div className="courses-summary">
                        <div className="summary-item">
                            <span className="summary-label">Total Créditos:</span>
                            <span className="summary-value">{totalCredits}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Materias:</span>
                            <span className="summary-value">{enrolledCourses.length}</span>
                        </div>
                    </div>

                    <div className="courses-list">
                        {enrolledCourses.map(course => (
                            <div key={course.id} className="course-item">
                                <div className="course-info">
                                    <div className="course-name">{course.name}</div>
                                    <div className="course-details">
                                        <span className="course-code">{course.code}</span>
                                        <span className="course-credits">{course.credits} créditos</span>
                                    </div>
                                </div>
                                <button 
                                    className="remove-course-btn"
                                    onClick={() => onRemoveCourse(course.id)}
                                    title="Remover materia"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="reminder-actions">
                        <button className="process-enrollment-btn">
                            🎓 Procesar Inscripción ({enrolledCourses.length} materias)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrollmentReminder;
