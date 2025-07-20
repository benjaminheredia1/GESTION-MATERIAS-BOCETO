// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Legend from './components/Legend';
import CurriculumGrid from './components/CurriculumGrid';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(true); // Cambiar a true para mostrar panel admin por defecto

  // 1. Creamos un objeto con los datos del estudiante
  const studentData = {
    name: 'Juan Carlos Pérez',
    code: '219012345',
    progress: 44, // Porcentaje de avance
    ppa: 85.50     // Promedio Ponderado Acumulado
  };

  return (
    <div className="App">
      {/* Header siempre visible */}
      <Header student={studentData} />
      
      {isAdminMode ? (
        <AdminPanel onBackToStudent={() => setIsAdminMode(false)} />
      ) : (
        <>
          {/* Botón para regresar al panel de administración */}
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <button 
              onClick={() => setIsAdminMode(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              🏢 Volver al Panel de Administración
            </button>
          </div>
          
          <Legend />
          <CurriculumGrid />
        </>
      )}
    </div>
  );
}

export default App;