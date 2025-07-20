// src/data/courses.js
// ★★★ DATOS DE POSICIÓN CORREGIDOS Y VERIFICADOS ★★★
export const coursesData = [
    // Semestre 1
    { id: 'BMS-300', name: 'Introducción a las Matemáticas', type: 'basica', gridRow: 1, gridCol: 1, prerequisites: [] },
    { id: 'BSG-300', name: 'Física I', type: 'basica', gridRow: 2, gridCol: 1, prerequisites: [] },
    { id: 'TRBA-300', name: 'Introducción a la Vida Universitaria TEC', type: 'complementaria', gridRow: 3, gridCol: 1, prerequisites: [] },
    { id: 'SAL-304', name: 'Matemáticas Discretas', type: 'especialidad', gridRow: 4, gridCol: 1, prerequisites: [] },
    { id: 'SCC-300', name: 'Ciencias de la Computación', type: 'especialidad', gridRow: 5, gridCol: 1, prerequisites: [] },
    // Semestre 2
    { id: 'BMS-301', name: 'Cálculo I', type: 'basica', gridRow: 1, gridCol: 2, prerequisites: ['BMS-300'] },
    { id: 'BMA-209', name: 'Álgebra Lineal', type: 'basica', gridRow: 2, gridCol: 2, prerequisites: ['BMS-300'] },
    { id: 'TRBA-333', name: 'Expresión oral y Escrita TEC', type: 'complementaria', gridRow: 3, gridCol: 2, prerequisites: [] },
    { id: 'BMA-303', name: 'Probabilidad y Estadística', type: 'basica', gridRow: 4, gridCol: 2, prerequisites: ['BMS-300'] },
    { id: 'SCH-301', name: 'Organización y Arquitectura de Computadoras', type: 'especialidad', gridRow: 5, gridCol: 2, prerequisites: ['SCC-300'] },
    { id: 'SAL-301', name: 'Algoritmos y Programación', type: 'especialidad', gridRow: 6, gridCol: 2, prerequisites: ['SCC-300'] },
    // Semestre 3
    { id: 'BMS-302', name: 'Cálculo II', type: 'basica', gridRow: 1, gridCol: 3, prerequisites: ['BMS-301'] },
    { id: 'TDC-301', name: 'Constitución y Ciudadanía TEC', type: 'basica', gridRow: 2, gridCol: 3, prerequisites: [] },
    { id: 'SDA-301', name: 'Fundamentos del Diseño Interactivo', type: 'especialidad', gridRow: 3, gridCol: 3, prerequisites: ['SCC-300'] },
    { id: 'BMA-304', name: 'Investigación Operativa', type: 'basica', gridRow: 4, gridCol: 3, prerequisites: ['BMA-303'] },
    { id: 'SOI-302', name: 'Sistemas Operativos', type: 'especialidad', gridRow: 5, gridCol: 3, prerequisites: ['SCH-301'] },
    { id: 'SIS-301', name: 'Base de Datos', type: 'especialidad', gridRow: 6, gridCol: 3, prerequisites: ['SAL-301'] },
    { id: 'SAL-302', name: 'Algoritmos y Estructura de Datos', type: 'especialidad', gridRow: 7, gridCol: 3, prerequisites: ['SAL-301'] },
    // Semestre 4
    { id: 'SDA-302', name: 'Desarrollo de Videojuegos', type: 'especialidad', gridRow: 2, gridCol: 4, prerequisites: ['SDA-301'] },
    { id: 'SRF-301', name: 'Redes I', type: 'especialidad', gridRow: 3, gridCol: 4, prerequisites: ['SCH-301'] },
    { id: 'SIS-303', name: 'Análisis y Modelado de Sistemas', type: 'especialidad', gridRow: 5, gridCol: 4, prerequisites: ['SOI-302'] },
    { id: 'SIS-302', name: 'Administración y Programación de Base de Datos', type: 'especialidad', gridRow: 6, gridCol: 4, prerequisites: ['SIS-301'] },
    { id: 'SAL-303', name: 'Algoritmos y Complejidad', type: 'especialidad', gridRow: 7, gridCol: 4, prerequisites: ['SAL-302'] },
    // Semestre 5
    { id: 'TRBA-337', name: 'Metodología de Investigación Tecnológica', type: 'basica', gridRow: 1, gridCol: 5, prerequisites: [] },
    { id: 'SRA-304', name: 'Redes Inalámbricas', type: 'especialidad', gridRow: 2, gridCol: 5, prerequisites: ['SRF-301'] },
    { id: 'SOI-301', name: 'Computación Paralela y Distribuida', type: 'especialidad', gridRow: 3, gridCol: 5, prerequisites: ['SOI-302'] },
    { id: 'SDA-303', name: 'Desarrollo de Aplicaciones Web', type: 'especialidad', gridRow: 6, gridCol: 5, prerequisites: ['SIS-302'] },
    { id: 'SAL-305', name: 'Programación Lógica y Funcional', type: 'especialidad', gridRow: 8, gridCol: 5, prerequisites: ['SAL-303'] },
    // Semestre 6
    { id: 'TPMA-301', name: 'Medio Ambiente TEC', type: 'complementaria', gridRow: 2, gridCol: 6, prerequisites: [] },
    { id: 'SOI-304', name: 'Administración de Sistemas Operativos', type: 'especialidad', gridRow: 3, gridCol: 6, prerequisites: ['SOI-301'] },
    { id: 'SOI-305', name: 'Sistema de Información Geográfica', type: 'especialidad', gridRow: 4, gridCol: 6, prerequisites: ['SIS-303'] },
    { id: 'SIS-304', name: 'Ingeniería de Software', type: 'especialidad', gridRow: 5, gridCol: 6, prerequisites: ['SIS-303'] },
    { id: 'SCC-302', name: 'Lenguajes Formales y Autómatas', type: 'especialidad', gridRow: 7, gridCol: 6, prerequisites: ['SAL-303'] },
    { id: 'SCC-304', name: 'Inteligencia Artificial', type: 'especialidad', gridRow: 8, gridCol: 6, prerequisites: ['SAL-305'] },
    // Semestre 7
    { id: 'PNG-360', name: 'Inglés Técnico I', type: 'basica', gridRow: 1, gridCol: 7, prerequisites: [] },
    { id: 'TDCCO-312', name: 'Legislación para Ingenieros TEC', type: 'complementaria', gridRow: 2, gridCol: 7, prerequisites: [] },
    { id: 'SRF-304', name: 'Seguridad de la Información', type: 'especialidad', gridRow: 3, gridCol: 7, prerequisites: ['SRA-304'] },
    { id: 'SIS-305', name: 'Calidad y Prueba de Software', type: 'especialidad', gridRow: 5, gridCol: 7, prerequisites: ['SIS-304'] },
    { id: 'SDA-304', name: 'Proyecto de Aplicaciones Móviles', type: 'especialidad', gridRow: 6, gridCol: 7, prerequisites: ['SDA-303'] },
    // Semestre 8
    { id: 'PNG-363', name: 'Inglés Técnico II', type: 'basica', gridRow: 1, gridCol: 8, prerequisites: ['PNG-360'] },
    { id: 'TPPY-301', name: 'Desarrollo Empresarial Tecnológico', type: 'complementaria', gridRow: 2, gridCol: 8, prerequisites: [] },
    { id: 'SES-301', name: 'Electiva I (Sistemas)', type: 'electiva', gridRow: 3, gridCol: 7, prerequisites: [] },
    { id: 'SOI-306', name: 'Infraestructura de TI y Tecnologías Emergentes', type: 'especialidad', gridRow: 4, gridCol: 8, prerequisites: ['SOI-304', 'SOI-305'] },
    { id: 'SOI-307', name: 'Gestión de Servicios de TI', type: 'especialidad', gridRow: 6, gridCol: 8, prerequisites: ['SIS-305'] },
    { id: 'SCC-303', name: 'Diseño de Compiladores', type: 'especialidad', gridRow: 7, gridCol: 8, prerequisites: ['SCC-302'] },
    { id: 'SCC-305', name: 'Análisis de datos', type: 'especialidad', gridRow: 8, gridCol: 8, prerequisites: ['SCC-304'] },
    // Semestre 9
    { id: 'SES-302', name: 'Electiva II (Sistemas)', type: 'electiva', gridRow: 3, gridCol: 8, prerequisites: ['SES-301'] },
    { id: 'STS-300', name: 'Taller de Graduación (Sistemas)', type: 'especialidad', gridRow: 4, gridCol: 9, prerequisites: [] },
    { id: 'SIS-306', name: 'Proyecto Integrador de Desarrollo de Soluciones Empresariales', type: 'especialidad', gridRow: 5, gridCol: 9, prerequisites: ['SIS-305'] },
    { id: 'SES-303', name: 'Electiva III (Sistemas)', type: 'electiva', gridRow: 3, gridCol: 9, prerequisites: ['SES-302'] },
  ];