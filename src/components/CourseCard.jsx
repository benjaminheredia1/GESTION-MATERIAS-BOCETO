// src/components/CourseCard.js
import React from 'react';

// Recibimos las nuevas props para manejar todos los estados
const CourseCard = ({ 
    course, 
    isPassed, 
    isFailed, 
    isUnavailable, 
    onToggleStatus, 
    isEnrolled, 
    onCourseClick, 
    enrollmentInfo 
}) => {
    const cardStyle = {
        gridColumn: (course.gridCol * 2) - 1,
        gridRow: (course.gridRow * 2) - 1,
    };

    // Creamos una lista de clases CSS incluyendo todos los estados
    const cardClassName = `
        course-card 
        ${course.type} 
        ${isPassed ? 'passed' : ''}
        ${isFailed ? 'failed' : ''}
        ${isUnavailable ? 'unavailable' : ''}
        ${isEnrolled ? 'enrolled' : ''}
    `;

    const handleClick = () => {
        if (isUnavailable) {
            // Si no está disponible, no hacer nada o mostrar mensaje
            return;
        } else if (isEnrolled) {
            // Si está inscrita, abrir modal de eliminación
            onCourseClick(course, 'remove', enrollmentInfo);
        } else if (!isPassed && !isFailed) {
            // Si no está inscrita, aprobada ni reprobada, abrir modal de inscripción
            onCourseClick(course, 'enroll');
        } else {
            // Si está aprobada o reprobada, cambiar estado como antes
            onToggleStatus(course.id);
        }
    };

    return (
        <div
            className={cardClassName}
            style={cardStyle}
            onClick={handleClick}
            data-course-id={course.id}
        >
            <span className="course-code">{course.id}</span>
            <p className="course-name">{course.name}</p>
            
            {/* Mostrar información de inscripción */}
            {isEnrolled && enrollmentInfo && (
                <div className="enrollment-info">
                    <div className="schedule-badge">
                        {enrollmentInfo.schedule.time}
                    </div>
                    <div className="enrolled-indicator">
                        ✓ Inscrita
                    </div>
                </div>
            )}
            
            {/* Mostrar indicador de aprobada */}
            {isPassed && (
                <div className="passed-indicator">
                    ✓
                </div>
            )}
            
            {/* Mostrar indicador de reprobada */}
            {isFailed && (
                <div className="failed-indicator">
                    ✗
                </div>
            )}
            
            {/* Mostrar indicador de no disponible */}
            {isUnavailable && (
                <div className="unavailable-indicator">
                    🚫
                </div>
            )}
        </div>
    );
};

export default CourseCard;