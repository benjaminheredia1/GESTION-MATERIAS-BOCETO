import React, { useState } from 'react';
import { coursesData } from '../data/courses';
import './CurriculumPensum.css';

const CurriculumPensum = ({ selectedStudent = null, enrollmentMode = null, onCourseEnroll = null }) => {
    const [expandedSemester, setExpandedSemester] = useState(null);

    // Expandir automáticamente el primer semestre en modo administrativo
    React.useEffect(() => {
        if (enrollmentMode === 'administrative' && selectedStudent && expandedSemester === null) {
            setExpandedSemester(1);
        }
    }, [enrollmentMode, selectedStudent, expandedSemester]);

    // Organizar materias por semestre
    const coursesBySemester = coursesData.reduce((acc, course) => {
        const semester = course.gridCol;
        if (!acc[semester]) {
            acc[semester] = [];
        }
        acc[semester].push(course);
        return acc;
    }, {});

    // Determinar el estado de una materia para el estudiante
    const getCourseStatus = (course) => {
        if (!selectedStudent) return 'available';
        
        // Lógica más realista para el modo administrativo
        const studentSemester = selectedStudent.semester || selectedStudent.currentSemester || 1;
        const courseSemester = course.gridCol || course.semester || 1;
        
        if (courseSemester < studentSemester) {
            // Materias de semestres anteriores
            // 80% aprobadas, 20% reprobadas
            const random = Math.random();
            return random > 0.2 ? 'passed' : 'failed';
        } else if (courseSemester === studentSemester) {
            // Materias del semestre actual
            // 40% inscritas, 60% disponibles (más disponibles para inscribir)
            const random = Math.random();
            return random > 0.6 ? 'enrolled' : 'available';
        } else if (courseSemester === studentSemester + 1) {
            // Siguiente semestre - todas disponibles
            return 'available';
        } else if (courseSemester <= studentSemester + 2) {
            // Dos semestres adelante - mayoría disponibles
            const random = Math.random();
            return random > 0.2 ? 'available' : 'locked';
        } else {
            // Semestres muy futuros - algunas bloqueadas por prerrequisitos
            const random = Math.random();
            return random > 0.5 ? 'available' : 'locked';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'passed': return '#10b981';
            case 'enrolled': return '#3b82f6';
            case 'failed': return '#ef4444';
            case 'available': return '#6b7280';
            case 'locked': return '#d1d5db';
            default: return '#6b7280';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'passed': return 'Aprobada';
            case 'enrolled': return 'Inscrita';
            case 'failed': return 'Reprobada';
            case 'available': return 'Disponible';
            case 'locked': return 'Bloqueada';
            default: return 'Desconocido';
        }
    };

    const toggleSemester = (semester) => {
        setExpandedSemester(expandedSemester === semester ? null : semester);
    };

    const maxSemester = Math.max(...Object.keys(coursesBySemester).map(Number));

    return (
        <div className="curriculum-pensum">
            <div className="pensum-header">
                <h3>
                    {selectedStudent 
                        ? `Pensum Académico - ${selectedStudent.name}` 
                        : 'Pensum de la Carrera'
                    }
                </h3>
                <p>Ingeniería en Sistemas de Información</p>
                
                {selectedStudent && (
                    <div className="pensum-legend">
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                            <span>Aprobadas</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                            <span>Inscritas</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
                            <span>Reprobadas</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#6b7280' }}></div>
                            <span>Disponibles</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#d1d5db' }}></div>
                            <span>Bloqueadas</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="semesters-grid">
                {Array.from({ length: maxSemester }, (_, index) => {
                    const semester = index + 1;
                    const courses = coursesBySemester[semester] || [];
                    const isExpanded = expandedSemester === semester;
                    
                    if (courses.length === 0) return null;

                    return (
                        <div key={semester} className="semester-column">
                                       <div className="course-badge"
                                onClick={() => toggleSemester(semester)}>
                                <h4>Módulo {semester}</h4>
                                <span className="course-count">{courses.length} materias</span>
                                <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                                    ▼
                                </span>
                            </div>
                            
                            <div className={`semester-courses ${isExpanded ? 'expanded' : ''}`}>
                                {courses.map(course => {
                                    const status = getCourseStatus(course);
                                    return (
                                        <div 
                                            key={course.id}
                                            className="pensum-course-card"
                                            style={{ 
                                                borderColor: getStatusColor(status),
                                                backgroundColor: status === 'passed' ? '#f0fdf4' : 
                                                               status === 'enrolled' ? '#eff6ff' :
                                                               status === 'failed' ? '#fef2f2' :
                                                               status === 'locked' ? '#f9fafb' : 'white'
                                            }}
                                        >
                                            <div className="course-name">{course.name}</div>
                                            <div className="course-code">{course.id}</div>
                                            <div className="course-credits">📚 {course.credits || 'N/A'}</div>
                                            <div className="course-module">📅 Módulo {course.semester || course.gridCol}</div>
                                            <div className="course-type">{course.type}</div>
                                            {selectedStudent && (
                                                <div 
                                                    className="course-status"
                                                    style={{ color: getStatusColor(status) }}
                                                >
                                                    {getStatusLabel(status)}
                                                </div>
                                            )}
                                            {enrollmentMode === 'administrative' && selectedStudent && status === 'available' && onCourseEnroll && (
                                                <button 
                                                    className="enroll-btn-pensum"
                                                    onClick={() => onCourseEnroll(course)}
                                                    title="Inscribir materia"
                                                >
                                                    ➕ Inscribir
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {!selectedStudent && (
                <div className="pensum-footer">
                    <p>
                        <strong>Total de materias:</strong> {coursesData.length} | 
                        <strong> Tipos:</strong> Básica, Complementaria, Especialidad, Electiva
                    </p>
                </div>
            )}
        </div>
    );
};

export default CurriculumPensum;
