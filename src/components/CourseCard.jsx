// src/components/CourseCard.js
import React from 'react';

// Recibimos las nuevas props: isPassed y onToggleStatus
const CourseCard = ({ course, isPassed, onToggleStatus }) => {
    const cardStyle = {
        gridColumn: (course.gridCol * 2) - 1,
        gridRow: (course.gridRow * 2) - 1,
    };
    // Creamos una lista de clases CSS.
    // Incluye la clase base 'course-card', el tipo de materia,
    // y condicionalmente la clase 'disabled' si la materia está aprobada.
    const cardClassName = `
    course-card 
    ${course.type} 
    ${isPassed ? 'disabled' : ''}
  `;

    return (
        // Añadimos el evento onClick que llama a la función del componente padre
        <div
            className={cardClassName}
            style={cardStyle}
            onClick={() => onToggleStatus(course.id)}
            data-course-id={course.id} // <-- AÑADE ESTA LÍNEA
        >
            <span className="course-code">{course.id}</span>
            <p className="course-name">{course.name}</p>
        </div>
    );
};

export default CourseCard;