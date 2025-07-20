// src/components/CurriculumGrid.js
import React, { useState, useRef, useLayoutEffect } from 'react';
import { coursesData } from '../data/courses';
import CourseCard from './CourseCard';
import Connectors from './Connectors'; // Importamos el nuevo componente

const CurriculumGrid = () => {
    const semesters = ["1ER...", "2DO...", "3ER...", "4TO...", "5TO...", "6TO...", "7MO...", "8VO...", "9NO..."];

    const [passedCourses, setPassedCourses] = useState(new Set(
        coursesData.filter(c => c.gridCol <= 4).map(c => c.id)
    ));

    // --- NUEVA LÓGICA PARA LÍNEAS ---
    const [positions, setPositions] = useState({});
    const gridRef = useRef(null); // Ref para el contenedor de la grilla

    // useLayoutEffect se ejecuta después de que el DOM se ha pintado
    useLayoutEffect(() => {
        if (!gridRef.current) return;

        const newPositions = {};
        // Iteramos sobre todos los elementos hijos de la grilla que tengan un 'data-course-id'
        gridRef.current.childNodes.forEach(node => {
            const courseId = node.dataset.courseId;
            if (courseId) {
                // Obtenemos la posición relativa al contenedor de la grilla
                newPositions[courseId] = {
                    left: node.offsetLeft,
                    top: node.offsetTop,
                    width: node.offsetWidth,
                    height: node.offsetHeight,
                };
            }
        });
        setPositions(newPositions);
    }, [coursesData]); // Se recalcula si los datos cambian
    // --- FIN DE NUEVA LÓGICA ---

    const handleTogglePassed = (courseId) => {
        setPassedCourses(prev => {
            const newPassed = new Set(prev);
            if (newPassed.has(courseId)) newPassed.delete(courseId);
            else newPassed.add(courseId);
            return newPassed;
        });
    };

    return (
        <div className="curriculum-container">
            <div className="grid-header">{/* ... */}</div>
            {/* Añadimos la ref al contenedor y un position-relative */}
            <div className="grid-content" ref={gridRef}>
                {/* Renderizamos los conectores PRIMERO para que queden detrás */}
                <Connectors courses={coursesData} positions={positions} />

                {coursesData.map(course => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        isPassed={passedCourses.has(course.id)}
                        onToggleStatus={handleTogglePassed}
                    />
                ))}
            </div>
        </div>
    );
};

export default CurriculumGrid;