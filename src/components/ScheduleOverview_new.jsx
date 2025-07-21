import React, { useState, useMemo } from 'react';
import { coursesData } from '../data/courses.js';

const ScheduleOverview = ({ enrollmentMode, selectedStudent }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedModality, setSelectedModality] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
    const [hideDisabled, setHideDisabled] = useState(false);

    // Determinar si estamos en modo panel (vista de materias disponibles)
    const isPanelMode = enrollmentMode === 'panel' && selectedStudent;

    // Función para obtener materias disponibles para un estudiante específico
    const getAvailableCourses = () => {
        if (!selectedStudent) return [];

        // Simulamos materias disponibles basadas en el semestre del estudiante
        const student = selectedStudent;
        
        // Materias base disponibles para matricular
        const availableCourses = [
            {
                id: 'MAT101',
                name: 'Matemáticas I',
                code: 'MAT101',
                credits: 4,
                semester: student.semester,
                enabled: true,
                prerequisitesMet: true,
                schedule: {
                    morning: [
                        { modalidad: 'Presencial', time: '7:15-10:00', room: 'A101', professor: 'Dr. González', available: 15 }
                    ],
                    afternoon: [
                        { modalidad: 'Presencial', time: '14:15-17:00', room: 'A102', professor: 'Dr. Morales', available: 8 }
                    ]
                }
            },
            {
                id: 'PRG201',
                name: 'Programación II',
                code: 'PRG201',
                credits: 4,
                semester: student.semester,
                enabled: true,
                prerequisitesMet: true,
                schedule: {
                    morning: [
                        { modalidad: 'Presencial', time: '7:15-10:00', room: 'Lab1', professor: 'Ing. López', available: 5 }
                    ],
                    evening: [
                        { modalidad: 'Presencial', time: '19:15-21:45', room: 'Lab2', professor: 'Ing. Rodríguez', available: 18 }
                    ]
                }
            },
            {
                id: 'BDD201',
                name: 'Base de Datos I',
                code: 'BDD201',
                credits: 3,
                semester: student.semester,
                enabled: true,
                prerequisitesMet: false, // Ejemplo de prerrequisitos no cumplidos
                schedule: {
                    afternoon: [
                        { modalidad: 'Virtual', time: '15:00-18:00', room: 'Virtual', professor: 'Ing. Martínez', available: 25 }
                    ]
                }
            }
        ];

        // Filtrar las materias según los filtros aplicados
        return availableCourses.filter(course => {
            const matchesTimeSlot = !selectedTimeSlot || course.schedule[selectedTimeSlot];
            const matchesModality = !selectedModality || 
                Object.values(course.schedule).flat().some(session => session.modalidad === selectedModality);
            const matchesSearch = !searchTerm || 
                course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.code.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesTimeSlot && matchesModality && matchesSearch;
        });
    };

    // Datos base del componente
    const timeSlots = [
        { id: 'morning', label: 'Mañana (7:15-12:00)' },
        { id: 'afternoon', label: 'Tarde (14:15-18:00)' },
        { id: 'evening', label: 'Noche (19:15-21:45)' }
    ];

    const courses = coursesData;
    const semesters = [...new Set(courses.map(course => course.semester))].sort();

    // Filtros para la vista normal
    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesTimeSlot = !selectedTimeSlot || course.schedule[selectedTimeSlot];
            const matchesSemester = !selectedSemester || course.semester === parseInt(selectedSemester);
            const matchesModality = !selectedModality || 
                Object.values(course.schedule).flat().some(session => session.modalidad === selectedModality);
            const matchesSearch = !searchTerm || 
                course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.code.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesAvailability = !showOnlyAvailable || 
                Object.values(course.schedule).flat().some(session => session.available > 0);
            const matchesEnabled = !hideDisabled || course.enabled !== false;

            return matchesTimeSlot && matchesSemester && matchesModality && 
                   matchesSearch && matchesAvailability && matchesEnabled;
        });
    }, [courses, selectedTimeSlot, selectedSemester, selectedModality, searchTerm, showOnlyAvailable, hideDisabled]);

    // Estadísticas de resumen
    const uniqueTimeSlots = new Set(
        filteredCourses.flatMap(course => Object.keys(course.schedule))
    );
    const uniqueModalities = new Set(
        filteredCourses.flatMap(course => 
            Object.values(course.schedule).flat().map(session => session.modalidad)
        )
    );
    const totalAvailability = filteredCourses.reduce((total, course) => 
        total + Object.values(course.schedule).flat().reduce((sum, session) => 
            sum + (session.available || 0), 0), 0
    );

    // Función para manejar selección de materia para inscripción
    const handleCourseSelect = (course) => {
        console.log('Materia seleccionada para inscripción:', course);
        alert(`Inscribiendo en: ${course.name} (${course.code})`);
    };

    return (
        <div className="schedule-overview">
            {isPanelMode ? (
                // Vista de materias disponibles para el estudiante seleccionado
                <div className="available-courses-view">
                    <div className="student-info-header">
                        <h3>Materias disponibles para {selectedStudent?.name}</h3>
                        <p>ID: {selectedStudent?.id} | Módulo: {selectedStudent?.semester}</p>
                    </div>

                    {/* Filtros para materias disponibles */}
                    <div className="filters-container">
                        <div className="filter-group">
                            <label htmlFor="timeSlotSelect">Jornada:</label>
                            <select 
                                id="timeSlotSelect"
                                value={selectedTimeSlot} 
                                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todas las jornadas</option>
                                {timeSlots.map(slot => (
                                    <option key={slot.id} value={slot.id}>{slot.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="modalitySelect">Modalidad:</label>
                            <select 
                                id="modalitySelect"
                                value={selectedModality} 
                                onChange={(e) => setSelectedModality(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todas las modalidades</option>
                                <option value="Presencial">Presencial</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Semipresencial">Semipresencial</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="courseSearch">Buscar materia:</label>
                            <input
                                id="courseSearch"
                                type="text"
                                placeholder="Buscar por nombre o código..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="filter-input"
                            />
                        </div>
                    </div>

                    {/* Grid de materias disponibles */}
                    <div className="available-courses-grid">
                        {getAvailableCourses().map(course => (
                            <div 
                                key={course.id} 
                                className={`course-card available ${course.prerequisitesMet === false ? 'prerequisites-missing' : ''}`}
                                onClick={() => handleCourseSelect(course)}
                            >
                                <div className="course-header">
                                    <h4 className="course-title">{course.name}</h4>
                                    <span className="course-code">{course.code}</span>
                                </div>

                                <div className="course-info">
                                    <span>📚 {course.credits || 'N/A'} créditos</span>
                                    <span>📅 Módulo {course.semester}</span>
                                    {course.prerequisitesMet !== undefined && (
                                        <span style={{ color: course.prerequisitesMet ? '#059669' : '#dc2626' }}>
                                            {course.prerequisitesMet ? '✅ Prerrequisitos OK' : '❌ Prerrequisitos faltantes'}
                                        </span>
                                    )}
                                </div>

                                <div className="course-schedules">
                                    {Object.entries(course.schedule).map(([timeSlot, sessions]) => 
                                        sessions.map((session, index) => (
                                            <div key={`${timeSlot}-${index}`} className="schedule-option">
                                                <span className="time">{session.time}</span>
                                                <span className="modality">{session.modalidad}</span>
                                                <span className="availability">
                                                    {session.available > 0 ? `${session.available} cupos` : 'Sin cupos'}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="enroll-button-container">
                                    <button 
                                        className="enroll-button"
                                        disabled={course.prerequisitesMet === false}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCourseSelect(course);
                                        }}
                                    >
                                        {course.prerequisitesMet === false ? 'Prerrequisitos faltantes' : 'Matricular'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {getAvailableCourses().length === 0 && (
                        <div className="no-courses">
                            <div className="no-courses-icon">📚</div>
                            <h4>No hay materias disponibles</h4>
                            <p>Este estudiante no tiene materias disponibles para matricular en este momento.</p>
                        </div>
                    )}
                </div>
            ) : (
                // Vista normal de horarios
                <>
                    {/* Filtros */}
                    <div className="filters-container">
                        <div className="filter-group">
                            <label htmlFor="timeSlotSelect">Jornada:</label>
                            <select 
                                id="timeSlotSelect"
                                value={selectedTimeSlot} 
                                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todas las jornadas</option>
                                {timeSlots.map(slot => (
                                    <option key={slot.id} value={slot.id}>{slot.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="semesterSelect">Módulo:</label>
                            <select 
                                id="semesterSelect"
                                value={selectedSemester} 
                                onChange={(e) => setSelectedSemester(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todos los módulos</option>
                                {semesters.map(sem => (
                                    <option key={sem} value={sem}>Módulo {sem}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="modalitySelect">Modalidad:</label>
                            <select 
                                id="modalitySelect"
                                value={selectedModality} 
                                onChange={(e) => setSelectedModality(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todas las modalidades</option>
                                <option value="Presencial">Presencial</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Semipresencial">Semipresencial</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="courseSearch">Buscar materia:</label>
                            <input
                                id="courseSearch"
                                type="text"
                                placeholder="Buscar por nombre o código..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="filter-input"
                            />
                        </div>

                        <div className="filter-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showOnlyAvailable}
                                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                                />
                                Solo materias con cupos
                            </label>
                        </div>

                        <div className="filter-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={hideDisabled}
                                    onChange={(e) => setHideDisabled(e.target.checked)}
                                />
                                Ocultar materias inhabilitadas
                            </label>
                        </div>
                    </div>

                    {/* Información de resumen */}
                    <div className="summary-info">
                        <div className="summary-stats">
                            <span>📊 {filteredCourses.length} materias encontradas</span>
                            <span>📅 {uniqueTimeSlots.size} jornadas disponibles</span>
                            <span>👥 Cupos disponibles: {totalAvailability}</span>
                            <span>🎯 Modalidades: {uniqueModalities.size}</span>
                        </div>
                    </div>

                    <div className="courses-schedule-grid">
                        {filteredCourses.map(course => {
                            const scheduleEntries = selectedTimeSlot 
                                ? (course.schedule[selectedTimeSlot] || [])
                                : Object.entries(course.schedule).flatMap(([timeSlot, sessions]) => 
                                    sessions.map(session => ({ ...session, timeSlot }))
                                  );

                            if (selectedTimeSlot && scheduleEntries.length === 0) return null;

                            return (
                                <div 
                                    key={course.id} 
                                    className={`course-card ${course.enabled === false ? 'disabled' : ''}`}
                                >
                                    <div className="course-header">
                                        <h4 className="course-title">{course.name}</h4>
                                        <span className="course-code">{course.code}</span>
                                    </div>

                                    <div className="course-badge">
                                        <span>📅 Módulo {course.semester}</span>
                                        {course.enrolledStudents && course.maxCapacity && (
                                            <span>👥 {course.enrolledStudents}/{course.maxCapacity}</span>
                                        )}
                                        {course.prerequisitesMet !== undefined && (
                                            <span style={{ color: course.prerequisitesMet ? '#059669' : '#dc2626' }}>
                                                {course.prerequisitesMet ? '✅ Prerrequisitos OK' : '❌ Prerrequisitos faltantes'}
                                            </span>
                                        )}
                                    </div>

                                    {course.enabled === false && course.reason && (
                                        <div className="prerequisite-warning">
                                            {course.reason}
                                        </div>
                                    )}

                                    <div className="schedule-sessions">
                                        <h4>Horarios Disponibles</h4>
                                        {scheduleEntries.length > 0 ? (
                                            scheduleEntries.map((session, index) => {
                                                const availability = session.available;
                                                let availabilityClass = 'high';
                                                let availabilityText = availability ? `${availability} cupos` : '';
                                                
                                                if (availability === 0) {
                                                    availabilityClass = 'full';
                                                    availabilityText = 'Sin cupos';
                                                } else if (availability && availability <= 5) {
                                                    availabilityClass = 'low';
                                                } else if (availability && availability <= 15) {
                                                    availabilityClass = 'medium';
                                                }

                                                return (
                                                    <div key={index} className="session-item">
                                                        <div className="session-main">
                                                            <div className="session-time">{session.time}</div>
                                                            <div className="session-modality">{session.modalidad}</div>
                                                            {!selectedTimeSlot && session.timeSlot && (
                                                                <span className="time-slot-indicator">
                                                                    {timeSlots.find(ts => ts.id === session.timeSlot)?.label}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="session-details">
                                                            <span className="room">📍 {session.room}</span>
                                                            <span className="professor">👨‍🏫 {session.professor}</span>
                                                            {availability !== undefined && (
                                                                <span className={`availability ${availabilityClass}`}>
                                                                    {availabilityText}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="no-sessions">
                                                <span>No hay horarios para este período</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="no-courses">
                            <div className="no-courses-icon">📅</div>
                            <h4>No hay materias disponibles</h4>
                            <p>Ajusta los filtros para ver más resultados</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ScheduleOverview;
