// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Legend from './components/Legend';
import CurriculumGrid from './components/CurriculumGrid';

function App() {
  // 1. Creamos un objeto con los datos del estudiante
  const studentData = {
    name: 'Juan Carlos Pérez',
    code: '219012345',
    progress: 44, // Porcentaje de avance
    ppa: 85.50     // Promedio Ponderado Acumulado
  };

  return (
    <div className="App">
      {/* 2. Pasamos los datos del estudiante al Header */}
      <Header student={studentData} />
      <Legend />
      <CurriculumGrid />
    </div>
  );
}

export default App;