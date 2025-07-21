import React, { useState, useEffect } from 'react';
import './StudentSearch.css';

const StudentSearch = ({ onStudentSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showEnrollmentOptions, setShowEnrollmentOptions] = useState(false);

    // Manejar el scroll del body cuando el modal está abierto
    useEffect(() => {
        if (showEnrollmentOptions) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup al desmontar el componente
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [showEnrollmentOptions]);

    // Datos simulados de estudiantes
    const students = [
        {
            id: 1,
            name: "Ana García Rodríguez",
            code: "743748132",
            semester: 5,
            enrolledCourses: 6,
            passedCourses: 28,
            failedCourses: 2,
            gpa: 3.7,
            status: "activo"
        },
        {
            id: 2,
            name: "Carlos Mendoza Luna",
            code: "743748145",
            semester: 7,
            enrolledCourses: 5,
            passedCourses: 42,
            failedCourses: 1,
            gpa: 4.1,
            status: "activo"
        },
        {
            id: 3,
            name: "María Elena Vargas",
            code: "743748167",
            semester: 3,
            enrolledCourses: 7,
            passedCourses: 18,
            failedCourses: 0,
            gpa: 4.3,
            status: "activo"
        },
        {
            id: 4,
            name: "Diego Fernández Torres",
            code: "743748189",
            semester: 9,
            enrolledCourses: 4,
            passedCourses: 55,
            failedCourses: 3,
            gpa: 3.9,
            status: "activo"
        },
        {
            id: 5,
            name: "Sofia Morales Castillo",
            code: "743748201",
            semester: 4,
            enrolledCourses: 6,
            passedCourses: 22,
            failedCourses: 1,
            gpa: 3.8,
            status: "activo"
        },
        {
            id: 6,
            name: "Roberto Silva Herrera",
            code: "743748223",
            semester: 6,
            enrolledCourses: 5,
            passedCourses: 35,
            failedCourses: 2,
            gpa: 3.5,
            status: "inactivo"
        },
        {
            id: 7,
            name: "Isabella Cruz Ramírez",
            code: "743748245",
            semester: 2,
            enrolledCourses: 8,
            passedCourses: 12,
            failedCourses: 0,
            gpa: 4.5,
            status: "activo"
        },
        {
            id: 8,
            name: "Alejandro Ruiz Jiménez",
            code: "743748267",
            semester: 10,
            enrolledCourses: 3,
            passedCourses: 58,
            failedCourses: 4,
            gpa: 3.6,
            status: "activo"
        }
    ];

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setShowEnrollmentOptions(true);
    };

    const handleEnrollmentOption = (option) => {
        if (option === 'map') {
            // Navegar a la vista de mapa/grilla
            onStudentSelect({ ...selectedStudent, enrollmentMode: 'map' });
        } else if (option === 'panel') {
            // Navegar a la vista del panel administrativo
            onStudentSelect({ ...selectedStudent, enrollmentMode: 'panel' });
        }
        setShowEnrollmentOptions(false);
        setSelectedStudent(null);
    };

    const handleCancelEnrollment = () => {
        setShowEnrollmentOptions(false);
        setSelectedStudent(null);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        return status === 'activo' ? '#10b981' : '#6b7280';
    };

    const getGpaColor = (gpa) => {
        if (gpa >= 4.0) return '#10b981';
        if (gpa >= 3.5) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="student-search">
            <h3>Buscar Estudiantes</h3>
            
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="search-icon">🔍</div>
            </div>

            <div className="search-results">
                <div className="results-header">
                    <span>{filteredStudents.length} estudiantes encontrados</span>
                </div>

                <div className="students-list">
                    {filteredStudents.map(student => (
                        <div
                            key={student.id}
                            className="student-item"
                            onClick={() => handleStudentClick(student)}
                        >
                            <div className="student-main-info">
                                <div className="student-name">{student.name}</div>
                                <div className="student-code">{student.code}</div>
                                <div 
                                    className="student-status"
                                    style={{ color: getStatusColor(student.status) }}
                                >
                                    ● {student.status.toUpperCase()}
                                </div>
                            </div>
                            
                            <div className="student-academic-info">
                                <div className="info-row">
                                    <span className="label">Módulo:</span>
                                    <span className="value">{student.semester}°</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Materias Inscritas:</span>
                                    <span className="value">{student.enrolledCourses}</span>
                                </div>
                             
                                <div className="info-row">
                                    <span className="label">Promedio:</span>
                                    <span 
                                        className="value gpa"
                                        style={{ color: getGpaColor(student.gpa) }}
                                    >
                                        {student.gpa.toFixed(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="student-progress">
                                <div className="progress-item passed">
                                    <span className="progress-number">{student.passedCourses}</span>
                                    <span className="progress-label">Aprobadas</span>
                                </div>
                                {student.failedCourses > 0 && (
                                    <div className="progress-item failed">
                                        <span className="progress-number">{student.failedCourses}</span>
                                        <span className="progress-label">Reprobadas</span>
                                    </div>
                                )}
                            </div>

                            <div className="click-indicator">
                                👤 Ver detalles
                            </div>
                        </div>
                    ))}
                </div>

                {filteredStudents.length === 0 && searchTerm && (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <p>No se encontraron estudiantes</p>
                        <small>Intenta con otro término de búsqueda</small>
                    </div>
                )}
            </div>

            {/* Modal de opciones de inscripción */}
            {showEnrollmentOptions && (
                <div className="enrollment-options-modal">
                    <div className="" onClick={handleCancelEnrollment}></div>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <button className="modal-close-btn" onClick={handleCancelEnrollment}>×</button>
                            <h3>🎓 Opciones de Inscripción</h3>
                            <p>Estudiante: <strong>{selectedStudent?.name}</strong></p>
                            <small>Código: {selectedStudent?.code} | Módulo: {selectedStudent?.semester}°</small>
                        </div>
                        
                        <div className="enrollment-options">
                            <button 
                                className="enrollment-option-btn map-option"
                                onClick={() => handleEnrollmentOption('map')}
                            >
                                <div className="option-icon">🗺️</div>
                                <div className="option-content">
                                    <h4>Inscripción Visual</h4>
                                    <p>Vista interactiva del pensum con conexiones entre materias y prerrequisitos</p>
                                </div>
                                <div className="option-arrow">→</div>
                            </button>

                            <button 
                                className="enrollment-option-btn panel-option"
                                onClick={() => handleEnrollmentOption('panel')}
                            >
                                <div className="option-icon">⚙️</div>
                                <div className="option-content">
                                    <h4>Panel Administrativo</h4>
                                    <p>Vista detallada con horarios, cupos disponibles y gestión completa</p>
                                </div>
                                <div className="option-arrow">→</div>
                            </button>
                        </div>

                        <div className="modal-actions">
                            <button 
                                className="cancel-btn"
                                onClick={handleCancelEnrollment}
                            >
                                ✕ Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentSearch;
