// src/components/CurriculumGrid.js
import React, { useState, useRef, useLayoutEffect } from 'react';
import { coursesData } from '../data/courses';
import CourseCard from './CourseCard';
import Connectors from './Connectors';
import CourseEnrollmentModal from './CourseEnrollmentModal';
import CourseRemovalModal from './CourseRemovalModal';
import FailedCourseAlert from './FailedCourseAlert';

const CurriculumGrid = () => {
    // Estados para materias aprobadas, reprobadas, no disponibles e inscritas
    const [passedCourses, setPassedCourses] = useState(new Set(
        coursesData.filter(c => c.gridCol <= 3).map(c => c.id) // Algunas materias ya aprobadas
    ));
    
    const [failedCourses, setFailedCourses] = useState(new Set([
        'BMA-303', 'SOI-302' // Ejemplo de materias reprobadas
    ]));
    
    const [unavailableCourses, setUnavailableCourses] = useState(new Set([
        'SES-301', 'SES-302', 'SES-303' // Ejemplo de materias no disponibles este semestre
    ]));
    
    // Estado para materias inscritas (courseId -> {course, schedule})
    const [enrolledCourses, setEnrolledCourses] = useState(new Map());
    
    // Estados para modales
    const [enrollmentModal, setEnrollmentModal] = useState({ isOpen: false, course: null });
    const [removalModal, setRemovalModal] = useState({ isOpen: false, enrolledCourse: null });
    const [failedAlert, setFailedAlert] = useState({ isOpen: false, course: null });

    // Estados para posiciones de conectores
    const [positions, setPositions] = useState({});
    const gridRef = useRef(null);

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
    }, []); // Removemos la dependencia innecesaria

    const handleTogglePassed = (courseId) => {
        const course = coursesData.find(c => c.id === courseId);
        
        if (passedCourses.has(courseId)) {
            // Si estaba aprobada, cambiar a normal
            setPassedCourses(prev => {
                const newPassed = new Set(prev);
                newPassed.delete(courseId);
                return newPassed;
            });
        } else if (failedCourses.has(courseId)) {
            // Si estaba reprobada, cambiar a aprobada
            setFailedCourses(prev => {
                const newFailed = new Set(prev);
                newFailed.delete(courseId);
                return newFailed;
            });
            setPassedCourses(prev => new Set(prev).add(courseId));
        } else {
            // Si estaba normal, marcar como reprobada y mostrar alerta
            setFailedCourses(prev => new Set(prev).add(courseId));
            setFailedAlert({ isOpen: true, course });
        }
    };

    // Manejar clicks en materias para abrir modales
    const handleCourseClick = (course, action, enrollmentInfo = null) => {
        if (action === 'enroll') {
            setEnrollmentModal({ isOpen: true, course });
        } else if (action === 'remove') {
            setRemovalModal({ isOpen: true, enrolledCourse: { course, ...enrollmentInfo } });
        }
    };

    // Inscribir materia
    const handleEnroll = (course, schedule) => {
        const newEnrolled = new Map(enrolledCourses);
        newEnrolled.set(course.id, { course, schedule });
        setEnrolledCourses(newEnrolled);
        
        // Opcional: también marcar como no aprobada/reprobada si estaba en esos estados
        if (passedCourses.has(course.id)) {
            setPassedCourses(prev => {
                const newPassed = new Set(prev);
                newPassed.delete(course.id);
                return newPassed;
            });
        }
        if (failedCourses.has(course.id)) {
            setFailedCourses(prev => {
                const newFailed = new Set(prev);
                newFailed.delete(course.id);
                return newFailed;
            });
        }
    };

    // Eliminar inscripción
    const handleRemoveEnrollment = (enrolledCourse) => {
        const newEnrolled = new Map(enrolledCourses);
        newEnrolled.delete(enrolledCourse.course.id);
        setEnrolledCourses(newEnrolled);
    };

    // Manejar reintento de materia reprobada
    const handleRetryFailedCourse = (course) => {
        // Remover de reprobadas y abrir modal de inscripción
        setFailedCourses(prev => {
            const newFailed = new Set(prev);
            newFailed.delete(course.id);
            return newFailed;
        });
        setEnrollmentModal({ isOpen: true, course });
    };

    return (
        <div className="curriculum-container">
            <div className="grid-header">{/* ... */}</div>
            {/* Añadimos la ref al contenedor y un position-relative */}
            <div className="grid-content" ref={gridRef}>
                {/* Renderizamos los conectores PRIMERO para que queden detrás */}
                <Connectors courses={coursesData} positions={positions} />

                {coursesData.map(course => {
                    const isEnrolled = enrolledCourses.has(course.id);
                    const enrollmentInfo = enrolledCourses.get(course.id);
                    const isPassed = passedCourses.has(course.id);
                    const isFailed = failedCourses.has(course.id);
                    const isUnavailable = unavailableCourses.has(course.id);
                    
                    return (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isPassed={isPassed}
                            isFailed={isFailed}
                            isUnavailable={isUnavailable}
                            onToggleStatus={handleTogglePassed}
                            isEnrolled={isEnrolled}
                            onCourseClick={handleCourseClick}
                            enrollmentInfo={enrollmentInfo}
                        />
                    );
                })}
            </div>

            {/* Modales */}
            <CourseEnrollmentModal
                course={enrollmentModal.course}
                isOpen={enrollmentModal.isOpen}
                onClose={() => setEnrollmentModal({ isOpen: false, course: null })}
                onEnroll={handleEnroll}
            />

            <CourseRemovalModal
                enrolledCourse={removalModal.enrolledCourse}
                isOpen={removalModal.isOpen}
                onClose={() => setRemovalModal({ isOpen: false, enrolledCourse: null })}
                onRemove={handleRemoveEnrollment}
            />

            <FailedCourseAlert
                course={failedAlert.course}
                isOpen={failedAlert.isOpen}
                onClose={() => setFailedAlert({ isOpen: false, course: null })}
                onRetry={handleRetryFailedCourse}
            />
        </div>
    );
};

export default CurriculumGrid;