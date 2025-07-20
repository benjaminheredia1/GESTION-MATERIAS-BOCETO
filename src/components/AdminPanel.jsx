import React, { useState } from 'react';
import StudentSearch from './StudentSearch';
import ScheduleOverview from './ScheduleOverview';
import CurriculumGrid from './CurriculumGrid';
import './AdminPanel.css';

const AdminPanel = ({ onBackToStudent }) => {
    const [currentView, setCurrentView] = useState('overview'); // 'overview' | 'student'
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeFilters, setActiveFilters] = useState({
        semester: 'all',
        courseType: 'all',
        schedule: 'all',
        status: 'all'
    });

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setCurrentView('student');
    };

    const handleBackToOverview = () => {
        setCurrentView('overview');
        setSelectedStudent(null);
    };

    return (
        <div className="admin-panel">
            {/* Header del Panel */}
            <div className="admin-header">
                <div className="admin-title">
                    <h1>Panel de Administración Académica</h1>
                    <p>Sistema de Gestión de Inscripciones y Pensums</p>
                </div>
                
                <div className="admin-navigation">
                    <button 
                        className={`nav-btn ${currentView === 'overview' ? 'active' : ''}`}
                        onClick={() => setCurrentView('overview')}
                    >
                        📊 Vista General
                    </button>
                    <button 
                        className={`nav-btn ${currentView === 'student' ? 'active' : ''}`}
                        onClick={() => setCurrentView('student')}
                        disabled={!selectedStudent}
                    >
                        👤 Estudiante
                    </button>
                    <button 
                        className="nav-btn"
                        onClick={onBackToStudent}
                        style={{
                            backgroundColor: '#10b981',
                            borderColor: '#10b981',
                            color: 'white'
                        }}
                    >
                        📚 Vista de Inscripción
                    </button>
                </div>
            </div>

            {/* Filtros Globales */}
            <div className="filters-section">
                <div className="filter-group">
                    <label>Semestre:</label>
                    <select 
                        value={activeFilters.semester}
                        onChange={(e) => setActiveFilters(prev => ({...prev, semester: e.target.value}))}
                    >
                        <option value="all">Todos</option>
                        <option value="2024-1">2024-1</option>
                        <option value="2024-2">2024-2</option>
                        <option value="2025-1">2025-1</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Tipo de Materia:</label>
                    <select 
                        value={activeFilters.courseType}
                        onChange={(e) => setActiveFilters(prev => ({...prev, courseType: e.target.value}))}
                    >
                        <option value="all">Todas</option>
                        <option value="basica">Formación Básica</option>
                        <option value="complementaria">Formación Complementaria</option>
                        <option value="especialidad">Especialidad</option>
                        <option value="electiva">Electiva</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Horario:</label>
                    <select 
                        value={activeFilters.schedule}
                        onChange={(e) => setActiveFilters(prev => ({...prev, schedule: e.target.value}))}
                    >
                        <option value="all">Todos</option>
                        <option value="morning">Matutino</option>
                        <option value="afternoon">Vespertino</option>
                        <option value="evening">Nocturno</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Estado:</label>
                    <select 
                        value={activeFilters.status}
                        onChange={(e) => setActiveFilters(prev => ({...prev, status: e.target.value}))}
                    >
                        <option value="all">Todos</option>
                        <option value="enrolled">Inscritos</option>
                        <option value="passed">Aprobados</option>
                        <option value="failed">Reprobados</option>
                        <option value="available">Disponibles</option>
                    </select>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="admin-content">
                {currentView === 'overview' ? (
                    <div className="overview-layout">
                        {/* Búsqueda de Estudiantes */}
                        <div className="search-section">
                            <StudentSearch onStudentSelect={handleStudentSelect} />
                        </div>

                        {/* Vista General de Horarios */}
                        <div className="schedule-section">
                            <ScheduleOverview filters={activeFilters} />
                        </div>
                    </div>
                ) : (
                    <div className="student-layout">
                        {/* Información del Estudiante Seleccionado */}
                        <div className="student-header">
                            <button className="back-btn" onClick={handleBackToOverview}>
                                ← Volver a Vista General
                            </button>
                            <div className="student-info">
                                <h2>{selectedStudent?.name}</h2>
                                <p>Código: {selectedStudent?.code} | Carrera: {selectedStudent?.career}</p>
                                <div className="student-stats">
                                    <span>Avance: {selectedStudent?.progress}%</span>
                                    <span>Promedio: {selectedStudent?.ppa}</span>
                                    <span>Semestre: {selectedStudent?.currentSemester}</span>
                                </div>
                            </div>
                        </div>

                        {/* Grid de Currículum para el Estudiante */}
                        <div className="student-curriculum">
                            <CurriculumGrid 
                                studentData={selectedStudent}
                                isAdminMode={true}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
