import React, { useState } from 'react';

const StudentSearch = ({ onStudentSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Datos simulados de estudiantes
    const students = [
        {
            id: 1,
            name: "Ana García Rodríguez",
            code: "EST2021001",
            semester: 5,
            enrolledCourses: 6,
            passedCourses: 28,
            failedCourses: 2,
            totalCredits: 84,
            gpa: 3.7,
            status: "activo"
        },
        {
            id: 2,
            name: "Carlos Mendoza Luna",
            code: "EST2020045",
            semester: 7,
            enrolledCourses: 5,
            passedCourses: 42,
            failedCourses: 1,
            totalCredits: 126,
            gpa: 4.1,
            status: "activo"
        },
        {
            id: 3,
            name: "María Elena Vargas",
            code: "EST2022078",
            semester: 3,
            enrolledCourses: 7,
            passedCourses: 18,
            failedCourses: 0,
            totalCredits: 54,
            gpa: 4.3,
            status: "activo"
        },
        {
            id: 4,
            name: "Diego Fernández Torres",
            code: "EST2019123",
            semester: 9,
            enrolledCourses: 4,
            passedCourses: 55,
            failedCourses: 3,
            totalCredits: 165,
            gpa: 3.9,
            status: "activo"
        },
        {
            id: 5,
            name: "Sofia Morales Castillo",
            code: "EST2021156",
            semester: 4,
            enrolledCourses: 6,
            passedCourses: 22,
            failedCourses: 1,
            totalCredits: 66,
            gpa: 3.8,
            status: "activo"
        },
        {
            id: 6,
            name: "Roberto Silva Herrera",
            code: "EST2020089",
            semester: 6,
            enrolledCourses: 5,
            passedCourses: 35,
            failedCourses: 2,
            totalCredits: 105,
            gpa: 3.5,
            status: "inactivo"
        },
        {
            id: 7,
            name: "Isabella Cruz Ramírez",
            code: "EST2022234",
            semester: 2,
            enrolledCourses: 8,
            passedCourses: 12,
            failedCourses: 0,
            totalCredits: 36,
            gpa: 4.5,
            status: "activo"
        },
        {
            id: 8,
            name: "Alejandro Ruiz Jiménez",
            code: "EST2018067",
            semester: 10,
            enrolledCourses: 3,
            passedCourses: 58,
            failedCourses: 4,
            totalCredits: 174,
            gpa: 3.6,
            status: "activo"
        }
    ];

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
                            onClick={() => onStudentSelect(student)}
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
                                    <span className="label">Semestre:</span>
                                    <span className="value">{student.semester}°</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Materias Inscritas:</span>
                                    <span className="value">{student.enrolledCourses}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Créditos:</span>
                                    <span className="value">{student.totalCredits}</span>
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
        </div>
    );
};

export default StudentSearch;
