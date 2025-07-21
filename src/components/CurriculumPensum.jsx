import React, { useState } from 'react';
import { coursesData } from '../data/courses';
import './CurriculumPensum.css';

const CurriculumPensum = ({ selectedStudent = null, enrollmentMode = null, onCourseEnroll = null }) => {
    const [expandedSemesters, setExpandedSemesters] = useState(new Set());
    const [enrollingCourse, setEnrollingCourse] = useState(null);

    // Organizar materias por semestre
    const coursesBySemester = coursesData.reduce((acc, course) => {
        const semester = course.gridCol;
        if (!acc[semester]) {
            acc[semester] = [];
        }
        acc[semester].push(course);
        return acc;
    }, {});

    // En modo administrativo, no expandir automáticamente - permitir control manual
    React.useEffect(() => {
        // Resetear acordeones cuando cambie el estudiante o modo
        if (enrollmentMode !== 'administrative') {
            setExpandedSemesters(new Set());
        }
        // Limpiar estado de inscripción cuando cambie el estudiante o modo
        setEnrollingCourse(null);
    }, [enrollmentMode, selectedStudent]);

    // Determinar el estado de una materia para el estudiante
    const getCourseStatus = (course) => {
        if (!selectedStudent) return 'available';
        
        // Lógica mejorada para mostrar estados realistas
        const studentSemester = selectedStudent.semester || selectedStudent.currentSemester || 1;
        const courseSemester = course.gridCol || course.semester || 1;
        
        if (courseSemester < studentSemester) {
            // Materias de semestres anteriores - 85% aprobadas, 15% reprobadas
            const random = Math.random();
            return random > 0.15 ? 'passed' : 'failed';
        } else if (courseSemester === studentSemester) {
            // Materias del semestre actual - 50% inscritas, 50% disponibles
            const random = Math.random();
            return random > 0.5 ? 'enrolled' : 'available';
        } else if (courseSemester === studentSemester + 1) {
            // Siguiente semestre - todas disponibles
            return 'available';
        } else if (courseSemester <= studentSemester + 2) {
            // Dos semestres adelante - mayoría disponibles
            const random = Math.random();
            return random > 0.1 ? 'available' : 'locked';
        } else {
            // Semestres muy futuros - algunas bloqueadas por prerrequisitos
            const random = Math.random();
            return random > 0.3 ? 'available' : 'locked';
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
        setExpandedSemesters(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(semester)) {
                newExpanded.delete(semester);
            } else {
                newExpanded.add(semester);
            }
            return newExpanded;
        });
    };

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
                
                {enrollmentMode === 'administrative' && selectedStudent && (
                    <div style={{
                        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                        border: '1px solid #3b82f6',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '16px',
                        color: '#1e40af',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        💡 <strong>Modo Administrativo:</strong> Haz clic en "➕ Inscribir" en cualquier materia disponible (gris) para inscribirla.
                    </div>
                )}
                
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

                {/* Controles de acordeones */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '12px', 
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => {
                            const allSemesters = Object.keys(coursesBySemester).map(Number);
                            setExpandedSemesters(new Set(allSemesters));
                        }}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        📂 Abrir Todos
                    </button>
                    <button
                        onClick={() => setExpandedSemesters(new Set())}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        📁 Cerrar Todos
                    </button>
                    <div style={{
                        padding: '8px 16px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600'
                    }}>
                        📊 Abiertos: {expandedSemesters.size}
                    </div>
                </div>
            </div>

            <div className="semesters-grid">
                {Object.keys(coursesBySemester)
                    .map(Number)
                    .sort((a, b) => a - b)
                    .map(semester => {
                        const courses = coursesBySemester[semester] || [];
                        // Verificar si este semestre está expandido
                        const isExpanded = expandedSemesters.has(semester);

                        return (
                            <div key={semester} className="semester-column">
                                <div className="semester-header"
                                    onClick={() => toggleSemester(semester)}>
                                    <h4>Semestre {semester}</h4>
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
                                            className={`pensum-course-card ${status}`}
                                            style={{ 
                                                borderColor: getStatusColor(status),
                                                borderWidth: status === 'passed' || status === 'failed' || status === 'enrolled' ? '2px' : '1px',
                                                backgroundColor: status === 'passed' ? '#dcfce7' : 
                                                               status === 'enrolled' ? '#dbeafe' :
                                                               status === 'failed' ? '#fee2e2' :
                                                               status === 'locked' ? '#f3f4f6' : 'white',
                                                boxShadow: status === 'passed' ? '0 2px 8px rgba(34, 197, 94, 0.2)' :
                                                          status === 'failed' ? '0 2px 8px rgba(239, 68, 68, 0.2)' :
                                                          status === 'enrolled' ? '0 2px 8px rgba(59, 130, 246, 0.2)' :
                                                          '0 1px 3px rgba(0, 0, 0, 0.1)'
                                            }}
                                        >
                                            <div className="course-name">{course.name}</div>
                                            <div className="course-code">{course.id}</div>
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
                                                    className={`enroll-btn-pensum ${enrollingCourse === course.id ? 'enrolling' : ''}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (enrollingCourse === course.id) return; // Prevenir doble click
                                                        
                                                        setEnrollingCourse(course.id);
                                                        onCourseEnroll(course);
                                                        // Resetear el estado después de un breve momento
                                                        setTimeout(() => setEnrollingCourse(null), 1500);
                                                    }}
                                                    title="Inscribir materia"
                                                    disabled={enrollingCourse === course.id}
                                                >
                                                    {enrollingCourse === course.id ? '✓ Inscrito' : '➕ Inscribir'}
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
