import React, { useState } from 'react';
import './CourseEnrollmentModal.css';

const SCHEDULES = [
    // Franja matutina temprana (3 horarios)
    { id: 'morning1a', time: '7:00 - 9:45', label: 'Matutino Temprano A' },
    { id: 'morning1b', time: '7:15 - 10:00', label: 'Matutino Temprano B' },
    { id: 'morning1c', time: '7:30 - 10:15', label: 'Matutino Temprano C' },
    
    // Franja matutina (4 horarios)
    { id: 'morning2a', time: '10:00 - 12:45', label: 'Matutino A' },
    { id: 'morning2b', time: '10:15 - 13:00', label: 'Matutino B' },
    { id: 'morning2c', time: '10:30 - 13:15', label: 'Matutino C' },
    { id: 'morning2d', time: '10:45 - 13:30', label: 'Matutino D' },
    
    // Franja vespertina temprana (3 horarios)
    { id: 'afternoon1a', time: '13:00 - 15:45', label: 'Vespertino Temprano A' },
    { id: 'afternoon1b', time: '13:15 - 16:00', label: 'Vespertino Temprano B' },
    { id: 'afternoon1c', time: '13:30 - 16:15', label: 'Vespertino Temprano C' },
    
    // Franja vespertina (4 horarios)
    { id: 'afternoon2a', time: '16:00 - 18:45', label: 'Vespertino A' },
    { id: 'afternoon2b', time: '16:15 - 19:00', label: 'Vespertino B' },
    { id: 'afternoon2c', time: '16:30 - 19:15', label: 'Vespertino C' },
    { id: 'afternoon2d', time: '16:45 - 19:30', label: 'Vespertino D' },
    
    // Franja nocturna (3 horarios)
    { id: 'evening1', time: '19:00 - 21:45', label: 'Nocturno A' },
    { id: 'evening2', time: '19:15 - 22:00', label: 'Nocturno B' },
    { id: 'evening3', time: '19:30 - 22:15', label: 'Nocturno C' }
];

const CourseEnrollmentModal = ({ course, isOpen, onClose, onEnroll }) => {
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [availableSchedules] = useState(() => {
        // Lógica más realista para mostrar horarios disponibles
        // Materias básicas tienden a tener más horarios disponibles
        // Materias de especialidad y electivas tienen menos opciones
        
        let probabilityThreshold;
        switch (course?.type) {
            case 'basica':
                probabilityThreshold = 0.25; // 75% de probabilidad de estar disponible
                break;
            case 'complementaria':
                probabilityThreshold = 0.4; // 60% de probabilidad
                break;
            case 'especialidad':
                probabilityThreshold = 0.55; // 45% de probabilidad
                break;
            case 'electiva':
                probabilityThreshold = 0.7; // 30% de probabilidad
                break;
            default:
                probabilityThreshold = 0.5;
        }
        
        return SCHEDULES.filter(() => Math.random() > probabilityThreshold);
    });

    if (!isOpen || !course) return null;

    const handleEnroll = () => {
        if (selectedSchedule) {
            const scheduleInfo = SCHEDULES.find(s => s.id === selectedSchedule);
            onEnroll(course, scheduleInfo);
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="enrollment-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Inscribir Materia</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-body">
                    <div className="course-info">
                        <h3>{course.name}</h3>
                        <p className="course-code">{course.id}</p>
                        <span className={`course-type-badge ${course.type}`}>
                            {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                        </span>
                    </div>

                    <div className="schedules-section">
                        <h4>Horarios Disponibles ({availableSchedules.length} opciones)</h4>
                        {availableSchedules.length === 0 ? (
                            <p className="no-schedules">No hay horarios disponibles para esta materia</p>
                        ) : (
                            <div className="schedules-grid">
                                {availableSchedules.map(schedule => {
                                    // Generar información realista para cada horario
                                    const spots = Math.floor(Math.random() * 20) + 5; // Entre 5 y 25 cupos
                                    const professors = [
                                        'Prof. García', 'Prof. Rodríguez', 'Prof. López', 
                                        'Prof. Martínez', 'Prof. González', 'Prof. Pérez',
                                        'Prof. Sánchez', 'Prof. Ramírez', 'Prof. Torres'
                                    ];
                                    const professor = professors[Math.floor(Math.random() * professors.length)];
                                    
                                    return (
                                        <div 
                                            key={schedule.id}
                                            className={`schedule-card ${selectedSchedule === schedule.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedSchedule(schedule.id)}
                                        >
                                            <div className="schedule-time">{schedule.time}</div>
                                            <div className="schedule-label">{schedule.label}</div>
                                            <div className="schedule-info">
                                                <span className={`spots ${spots < 10 ? 'low' : ''}`}>
                                                    {spots} cupos disponibles
                                                </span>
                                                <span className="professor">{professor}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button 
                        className="btn-enroll" 
                        onClick={handleEnroll}
                        disabled={!selectedSchedule}
                    >
                        Inscribir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseEnrollmentModal;
