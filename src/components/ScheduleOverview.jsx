import React, { useState } from 'react';

const ScheduleOverview = ({ filters }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    // Datos simulados de horarios y materias
    const timeSlots = [
        { id: 'morning', label: 'Mañana', time: '7:00 - 12:00' },
        { id: 'afternoon', label: 'Tarde', time: '14:00 - 18:00' },
        { id: 'evening', label: 'Noche', time: '18:00 - 22:00' }
    ];

    const courses = [
        {
            id: 1,
            name: "Matemáticas I",
            code: "MAT101",
            credits: 3,
            semester: 1,
            enrolledStudents: 45,
            maxCapacity: 50,
            schedule: {
                morning: [
                    { day: 'Lunes', time: '8:00-10:00', room: 'A101', professor: 'Dr. García' },
                    { day: 'Miércoles', time: '8:00-10:00', room: 'A101', professor: 'Dr. García' }
                ],
                afternoon: [
                    { day: 'Martes', time: '14:00-16:00', room: 'B205', professor: 'Dra. Morales' },
                    { day: 'Jueves', time: '14:00-16:00', room: 'B205', professor: 'Dra. Morales' }
                ]
            }
        },
        {
            id: 2,
            name: "Programación I",
            code: "PRG101",
            credits: 4,
            semester: 1,
            enrolledStudents: 42,
            maxCapacity: 45,
            schedule: {
                morning: [
                    { day: 'Martes', time: '9:00-11:00', room: 'Lab1', professor: 'Ing. López' },
                    { day: 'Jueves', time: '9:00-11:00', room: 'Lab1', professor: 'Ing. López' }
                ],
                evening: [
                    { day: 'Lunes', time: '19:00-21:00', room: 'Lab2', professor: 'Ing. Rodríguez' },
                    { day: 'Miércoles', time: '19:00-21:00', room: 'Lab2', professor: 'Ing. Rodríguez' }
                ]
            }
        },
        {
            id: 3,
            name: "Química General",
            code: "QUI101",
            credits: 3,
            semester: 1,
            enrolledStudents: 38,
            maxCapacity: 40,
            schedule: {
                afternoon: [
                    { day: 'Lunes', time: '15:00-17:00', room: 'Lab Química', professor: 'Dra. Vásquez' },
                    { day: 'Viernes', time: '15:00-17:00', room: 'Lab Química', professor: 'Dra. Vásquez' }
                ]
            }
        },
        {
            id: 4,
            name: "Cálculo I",
            code: "CAL101",
            credits: 4,
            semester: 2,
            enrolledStudents: 35,
            maxCapacity: 45,
            schedule: {
                morning: [
                    { day: 'Lunes', time: '10:00-12:00', room: 'A203', professor: 'Dr. Fernández' },
                    { day: 'Miércoles', time: '10:00-12:00', room: 'A203', professor: 'Dr. Fernández' }
                ],
                evening: [
                    { day: 'Martes', time: '20:00-22:00', room: 'A105', professor: 'Dra. Silva' },
                    { day: 'Jueves', time: '20:00-22:00', room: 'A105', professor: 'Dra. Silva' }
                ]
            }
        }
    ];

    // Filtrar cursos según los filtros seleccionados
    const filteredCourses = courses.filter(course => {
        if (filters.semester && filters.semester !== 'all' && course.semester !== parseInt(filters.semester)) {
            return false;
        }
        if (filters.timeSlot && filters.timeSlot !== 'all' && !course.schedule[filters.timeSlot]) {
            return false;
        }
        return true;
    });

    const getCapacityColor = (enrolled, max) => {
        const percentage = (enrolled / max) * 100;
        if (percentage >= 90) return '#ef4444';
        if (percentage >= 75) return '#f59e0b';
        return '#10b981';
    };

    const getCapacityStatus = (enrolled, max) => {
        const percentage = (enrolled / max) * 100;
        if (percentage >= 90) return 'Casi lleno';
        if (percentage >= 75) return 'Disponible';
        return 'Disponible';
    };

    return (
        <div className="schedule-overview">
            <div className="overview-header">
                <h3>Vista General de Horarios</h3>
                <div className="overview-stats">
                    <span className="stat-item">
                        <strong>{filteredCourses.length}</strong> materias
                    </span>
                    <span className="stat-item">
                        <strong>{filteredCourses.reduce((sum, course) => sum + course.enrolledStudents, 0)}</strong> estudiantes inscritos
                    </span>
                </div>
            </div>

            <div className="time-slots-tabs">
                <button
                    className={`time-slot-tab ${!selectedTimeSlot ? 'active' : ''}`}
                    onClick={() => setSelectedTimeSlot(null)}
                >
                    Todos los horarios
                </button>
                {timeSlots.map(slot => (
                    <button
                        key={slot.id}
                        className={`time-slot-tab ${selectedTimeSlot === slot.id ? 'active' : ''}`}
                        onClick={() => setSelectedTimeSlot(slot.id)}
                    >
                        {slot.label}
                        <small>{slot.time}</small>
                    </button>
                ))}
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
                        <div key={course.id} className="course-schedule-card">
                            <div className="course-header">
                                <div className="course-title">
                                    <h4>{course.name}</h4>
                                    <span className="course-code">{course.code}</span>
                                </div>
                                <div className="course-info">
                                    <span className="credits">{course.credits} créditos</span>
                                    <span className="semester">Semestre {course.semester}</span>
                                </div>
                            </div>

                            <div className="enrollment-status">
                                <div className="enrollment-bar">
                                    <div 
                                        className="enrollment-fill"
                                        style={{ 
                                            width: `${(course.enrolledStudents / course.maxCapacity) * 100}%`,
                                            backgroundColor: getCapacityColor(course.enrolledStudents, course.maxCapacity)
                                        }}
                                    ></div>
                                </div>
                                <div className="enrollment-text">
                                    <span>{course.enrolledStudents}/{course.maxCapacity} estudiantes</span>
                                    <span 
                                        className="status-text"
                                        style={{ color: getCapacityColor(course.enrolledStudents, course.maxCapacity) }}
                                    >
                                        {getCapacityStatus(course.enrolledStudents, course.maxCapacity)}
                                    </span>
                                </div>
                            </div>

                            <div className="schedule-sessions">
                                {scheduleEntries.length > 0 ? (
                                    scheduleEntries.map((session, index) => (
                                        <div key={index} className="session-item">
                                            <div className="session-time">
                                                <span className="day">{session.day}</span>
                                                <span className="time">{session.time}</span>
                                                {session.timeSlot && (
                                                    <span className="time-slot-badge">
                                                        {timeSlots.find(ts => ts.id === session.timeSlot)?.label}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="session-details">
                                                <span className="room">📍 {session.room}</span>
                                                <span className="professor">👨‍🏫 {session.professor}</span>
                                            </div>
                                        </div>
                                    ))
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
        </div>
    );
};

export default ScheduleOverview;
