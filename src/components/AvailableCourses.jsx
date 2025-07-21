import React, { useState } from 'react';
import { coursesData } from '../data/courses';
import './AvailableCourses.css';

const AvailableCourses = ({ selectedStudent, onBackToOverview }) => {
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar materias disponibles para el estudiante
    const getAvailableCourses = () => {
        if (!selectedStudent) return [];

        return coursesData.filter(course => {
            // Materias del semestre actual del estudiante o anteriores no aprobadas
            const canTake = course.gridCol <= selectedStudent.semester + 1;
            
            // Simulación: algunas materias ya fueron aprobadas
            const isNotCompleted = Math.random() > 0.4; // 60% de materias disponibles
            
            return canTake && isNotCompleted;
        });
    };

    const availableCourses = getAvailableCourses();

    // Filtrar por búsqueda
    const filteredCourses = availableCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Agrupar por semestre
    const coursesBySemester = filteredCourses.reduce((acc, course) => {
        const semester = course.gridCol;
        if (!acc[semester]) {
            acc[semester] = [];
        }
        acc[semester].push(course);
        return acc;
    }, {});

    const handleCourseToggle = (courseId) => {
        setSelectedCourses(prev => 
            prev.includes(courseId) 
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const handleEnrollSelected = () => {
        if (selectedCourses.length === 0) {
            alert('Selecciona al menos una materia para inscribir');
            return;
        }
        
        const selectedCourseNames = availableCourses
            .filter(course => selectedCourses.includes(course.id))
            .map(course => course.name);
            
        alert(`Materias seleccionadas para inscripción:\n${selectedCourseNames.join('\n')}`);
        
        // Aquí podrías llamar una función para procesar la inscripción
        setSelectedCourses([]);
    };

    const getCourseStatus = (course) => {
        // Simulación de estados
        const random = Math.random();
        if (course.gridCol < selectedStudent.semester) {
            return random > 0.8 ? 'retake' : 'available'; // Materias para repetir
        } else if (course.gridCol === selectedStudent.semester) {
            return 'current'; // Materias del semestre actual
        } else {
            return random > 0.6 ? 'available' : 'prerequisites'; // Futuras o con prerrequisitos
        }
    };

    return (
        <div className="available-courses">
            <div className="courses-header">
                <button className="back-btn" onClick={onBackToOverview}>
                    ← Volver a Vista General
                </button>
                
                <div className="student-info">
                    <h2>📚 Materias Disponibles</h2>
                    <p>Estudiante: <strong>{selectedStudent?.name}</strong></p>
                    <small>Código: {selectedStudent?.code} | Semestre: {selectedStudent?.semester}°</small>
                </div>

                <div className="enrollment-summary">
                    <span className="selected-count">
                        {selectedCourses.length} materias seleccionadas
                    </span>
                    <button 
                        className="enroll-btn"
                        onClick={handleEnrollSelected}
                        disabled={selectedCourses.length === 0}
                    >
                        Inscribir Seleccionadas
                    </button>
                </div>
            </div>

            <div className="courses-filters">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar materias..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="courses-stats">
                    <div className="stat-item">
                        <span className="number">{filteredCourses.length}</span>
                        <span className="label">Disponibles</span>
                    </div>
                    <div className="stat-item">
                        <span className="number">{selectedCourses.length}</span>
                        <span className="label">Seleccionadas</span>
                    </div>
                </div>
            </div>

            <div className="courses-legend">
                <div className="legend-item">
                    <div className="legend-dot available"></div>
                    <span>Disponible</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot current"></div>
                    <span>Semestre Actual</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot retake"></div>
                    <span>Para Repetir</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot prerequisites"></div>
                    <span>Prerrequisitos Pendientes</span>
                </div>
            </div>

            <div className="courses-content">
                {Object.keys(coursesBySemester)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(semester => (
                    <div key={semester} className="semester-section">
                        <h3 className="semester-title">
                            Semestre {semester}
                            <span className="course-count">
                                {coursesBySemester[semester].length} materias
                            </span>
                        </h3>

                        <div className="courses-grid">
                            {coursesBySemester[semester].map(course => {
                                const status = getCourseStatus(course);
                                const isSelected = selectedCourses.includes(course.id);
                                
                                return (
                                    <div
                                        key={course.id}
                                        className={`course-card ${status} ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleCourseToggle(course.id)}
                                    >
                                        <div className="course-header">
                                            <div className="course-code">{course.code}</div>
                                            <div className={`course-status-indicator ${status}`}></div>
                                        </div>
                                        
                                        <div className="course-name">{course.name}</div>
                                        
                                        <div className="course-details">
                                            <span className="credits">
                                                📊 {course.credits || 4} créditos
                                            </span>
                                            <span className="semester-info">
                                                📅 {semester}° semestre
                                            </span>
                                        </div>

                                        <div className="course-schedule">
                                            <span>🕐 Lun-Mie 8:00-10:00</span>
                                        </div>

                                        <div className="course-capacity">
                                            <span>👥 {Math.floor(Math.random() * 15) + 10}/35 inscritos</span>
                                        </div>

                                        {isSelected && (
                                            <div className="selected-indicator">
                                                ✓ Seleccionada
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {filteredCourses.length === 0 && (
                    <div className="no-courses">
                        <div className="no-courses-icon">📚</div>
                        <h3>No hay materias disponibles</h3>
                        <p>No se encontraron materias que coincidan con tu búsqueda o estado académico.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableCourses;
