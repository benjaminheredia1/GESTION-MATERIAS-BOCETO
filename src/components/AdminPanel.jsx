import React, { useState } from 'react';
import StudentSearch from './StudentSearch';
import ScheduleOverview from './ScheduleOverview';
import CurriculumGrid from './CurriculumGrid';
import CurriculumPensum from './CurriculumPensum';
import EnrollmentReminder from './EnrollmentReminder';
import ModeSelectionModal from './ModeSelectionModal';
import './AdminPanel.css';

const AdminPanel = ({ onBackToStudent }) => {
    const [currentView, setCurrentView] = useState('overview'); // 'overview' | 'student' | 'enrollment' | 'pensum'
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [enrollmentMode, setEnrollmentMode] = useState(null); // 'map' | 'panel'
    const [viewMode, setViewMode] = useState(null); // 'visual' | 'administrative'
    const [showModeModal, setShowModeModal] = useState(false);
    const [pendingStudent, setPendingStudent] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]); // Materias seleccionadas para inscripción
    const [activeFilters, setActiveFilters] = useState({
        semester: 'all',
        courseType: 'all',
        schedule: 'all',
        status: 'all'
    });

    const handleStudentSelect = (student, mode = null) => {
        if (mode) {
            // Si ya se especificó un modo (desde otro componente)
            setSelectedStudent(student);
            setViewMode(mode);
            setEnrollmentMode(mode);
            setCurrentView(mode === 'visual' ? 'enrollment' : 'pensum');
            setEnrolledCourses([]);
        } else {
            // Mostrar modal para seleccionar modo
            setPendingStudent(student);
            setShowModeModal(true);
        }
    };

    const handleModeSelect = (mode) => {
        if (pendingStudent) {
            setSelectedStudent(pendingStudent);
            setViewMode(mode);
            
            // Configurar vista y modo según la selección
            if (mode === 'visual') {
                setEnrollmentMode('map');
                setCurrentView('enrollment'); // Redirigir a vista de inscripción
            } else if (mode === 'administrative') {
                setEnrollmentMode('administrative');
                setCurrentView('overview'); // Mantener en vista general con pensum administrativo
            }
            
            setPendingStudent(null);
            setEnrolledCourses([]);
        }
        setShowModeModal(false); // Asegurar que el modal se cierre
    };

    const handleBackToOverview = () => {
        setCurrentView('overview');
        setSelectedStudent(null);
        setEnrollmentMode(null);
        setViewMode(null);
        setEnrolledCourses([]);
    };

    const handleCourseEnroll = (course) => {
        setEnrolledCourses(prev => {
            // Verificar si la materia ya está inscrita
            if (prev.find(c => c.id === course.id)) {
                return prev; // No agregar duplicados
            }
            return [...prev, course];
        });
    };

    const handleRemoveCourse = (courseId) => {
        setEnrolledCourses(prev => prev.filter(course => course.id !== courseId));
    };

    return (
        <div className="admin-panel">
            {/* Header del Panel */}
            <div className="admin-header">
                <div className="admin-title">
                    <h1>Panel de Administración Académica</h1>
                    <p>Sistema de Gestión de Inscripciones y Pensums</p>
                    {enrollmentMode === 'administrative' && selectedStudent && (
                        <div style={{ 
                            marginTop: '8px', 
                            background: '#10b981', 
                            color: 'white', 
                            padding: '4px 12px', 
                            borderRadius: '6px', 
                            fontSize: '14px',
                            display: 'inline-block'
                        }}>
                            Modo Administrativo - {selectedStudent.name} | Materias inscritas: {enrolledCourses.length}
                        </div>
                    )}
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
                        className={`nav-btn ${currentView === 'enrollment' ? 'active' : ''}`}
                        onClick={() => {
                            if (selectedStudent) {
                                setCurrentView('enrollment');
                                setEnrollmentMode('map');
                                setViewMode('visual');
                            } else {
                                alert('Por favor selecciona un estudiante primero');
                            }
                        }}
                        disabled={!selectedStudent}
                        style={{
                            backgroundColor: currentView === 'enrollment' ? '#059669' : (selectedStudent ? '#10b981' : '#94a3b8'),
                            borderColor: currentView === 'enrollment' ? '#059669' : (selectedStudent ? '#10b981' : '#94a3b8'),
                            color: 'white',
                            cursor: selectedStudent ? 'pointer' : 'not-allowed'
                        }}
                    >
                        📚 Inscripción Visual
                    </button>
                    {onBackToStudent && (
                        <button 
                            className="nav-btn"
                            onClick={onBackToStudent}
                            style={{
                                backgroundColor: '#ef4444',
                                borderColor: '#ef4444',
                                color: 'white'
                            }}
                        >
                            ← Vista Principal
                        </button>
                    )}
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
                            <ScheduleOverview 
                                filters={activeFilters} 
                                selectedStudent={selectedStudent}
                                enrollmentMode={enrollmentMode}
                                onCourseEnroll={handleCourseEnroll}
                            />
                        </div>

                        {/* Pensum de la carrera */}
                        <div className="pensum-section">
                            <CurriculumPensum 
                                selectedStudent={selectedStudent} 
                                enrollmentMode={enrollmentMode}
                                onCourseEnroll={handleCourseEnroll}
                            />
                        </div>
                    </div>
                ) : currentView === 'enrollment' ? (
                    <div className="enrollment-layout">
                        <div className="enrollment-header">
                            <button className="back-btn" onClick={handleBackToOverview}>
                                ← Volver a Vista General
                            </button>
                            <h2>
                                🗺️ Vista Visual de Inscripción - {selectedStudent?.name}
                            </h2>
                        </div>

                        <div className="map-enrollment">
                            <CurriculumGrid 
                                studentData={selectedStudent}
                                isAdminMode={true}
                                enrollmentMode={true}
                                onCourseEnroll={handleCourseEnroll}
                            />
                        </div>
                    </div>
                ) : currentView === 'pensum' ? (
                    <div className="pensum-layout">
                        <div className="pensum-header-section">
                            <button className="back-btn" onClick={handleBackToOverview}>
                                ← Volver a Vista General
                            </button>
                            <h2>
                                📋 Vista Administrativa - {selectedStudent?.name}
                            </h2>
                            <div className="student-summary">
                                <span>Código: {selectedStudent?.code}</span>
                                <span>Semestre: {selectedStudent?.semester}</span>
                                <span>Avance: {selectedStudent?.progress}%</span>
                            </div>
                        </div>

                        <div className="administrative-pensum">
                            <CurriculumPensum selectedStudent={selectedStudent} />
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

                        {/* Pensum personalizado del estudiante */}
                        <div className="student-pensum">
                            <CurriculumPensum selectedStudent={selectedStudent} />
                        </div>
                    </div>
                )}
            </div>

            {/* Recordatorio de materias seleccionadas - visible en modo inscripción y administrativo */}
            {(currentView === 'enrollment' || enrollmentMode === 'administrative') && enrolledCourses.length > 0 && (
                <EnrollmentReminder
                    enrolledCourses={enrolledCourses}
                    onRemoveCourse={handleRemoveCourse}
                    selectedStudent={selectedStudent}
                />
            )}

            {/* Modal de selección de modo */}
            <ModeSelectionModal
                isOpen={showModeModal}
                onClose={() => setShowModeModal(false)}
                onSelectMode={handleModeSelect}
                student={pendingStudent}
            />
        </div>
    );
};

export default AdminPanel;
